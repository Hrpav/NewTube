"use client";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { Suspense } from "react";
import { format } from "date-fns";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { snakeCaseToTitle } from "@/lib/utils";

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
                      <div className="flex items-center gap-4">
                        <div className="relative aspect-video w-36 shrink-0">
                          <VideoThumbnail 
                           imageUrl={video.thumbnailUrl} 
                           previewUrl={video.previewUrl}
                           title={video.title}
                           duration={video.duration || 0}
                          />
                        </div>
                        <div className="min-w-0 flex flex-col overflow-hidden gap-y-1">
                          <span className="text-sm font-medium text-zinc-900 line-clamp-1">
                            {video.title}
                          </span>
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {video.description || "No description"}
                          </span>
                        </div>
                      </div>
                      </TableCell>
                    <TableCell className="py-4">
                      visibility
                      </TableCell>
                    <TableCell className="py-4">
                        <div className="flex items-center">
                          {snakeCaseToTitle(video.muxStatus || "Error")}
                        </div>
                      </TableCell>
                    <TableCell className="py-4 text-sm truncate">
                      {format(new Date(video.createdAt), "d MMM yyyy")}
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
