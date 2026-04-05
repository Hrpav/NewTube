"use client";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "@/components/infinite-scroll";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const VideosSection = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideosSectionSuspense = () => {
  const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  return (
    <div>
      <div className="rounded-md border border-zinc-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-zinc-100">
              <TableHead className="h-12 pl-6 w-[510px] text-zinc-500 font-semibold text-xs uppercase tracking-wider">
                Video
              </TableHead>
              <TableHead className="h-12 text-zinc-500 font-semibold text-xs uppercase tracking-wider">
                Visibility
              </TableHead>
              <TableHead className="h-12 text-zinc-500 font-semibold text-xs uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="h-12 text-zinc-500 font-semibold text-xs uppercase tracking-wider">
                Date
              </TableHead>
              <TableHead className="h-12 text-right text-zinc-500 font-semibold text-xs uppercase tracking-wider">
                Views
              </TableHead>
              <TableHead className="h-12 text-right text-zinc-500 font-semibold text-xs uppercase tracking-wider">
                Comments
              </TableHead>
              <TableHead className="h-12 text-right pr-6 text-zinc-500 font-semibold text-xs uppercase tracking-wider">
                Likes
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.pages
              .flatMap((page) => page.items)
              .map((video) => (
                <Link
                  href={`/studio/videos/${video.id}`}
                  key={video.id}
                  legacyBehavior
                >
                  <TableRow className="cursor-pointer group border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
                    <TableCell className="pl-6 py-4">
                      {video.title}
                      </TableCell>
                    <TableCell className="py-4">
                      visibility
                      </TableCell>
                    <TableCell className="py-4">
                      status
                      </TableCell>
                    <TableCell className="py-4">
                      date
                      </TableCell>
                    <TableCell className="py-4 text-right">
                      views
                      </TableCell>
                    <TableCell className="py-4 text-right">
                      comments
                      </TableCell>
                    <TableCell className="pr-6 py-4 text-right">
                      likes
                    </TableCell>
                  </TableRow>
                </Link>
              ))}
          </TableBody>
        </Table>
      </div>
      <InfiniteScroll
        isManual={true}
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
};
