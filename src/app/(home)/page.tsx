import { HydrateClient, trpc } from "@/trpc/server";
import { PageClient } from "./client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

// im not sure if you need async on the void trpc one?
// but if i remove async its not gonna throw any errors/warnings
// ill use async everywhere lol
export default async function Home() {
  // i think there are more than one buti used this one...
  // const data = await trpc.hello({ text: "Hrpavi" }); // SERVER COMPONENT FETCHING FROM THE DATA
                                                         // WITHOUT "use client";
  void trpc.hello.prefetch({ text: "Hrpavi" });

  return (
    <div>
      <HydrateClient>
        <Suspense fallback={<p>Loading...</p>}>
          <ErrorBoundary fallback={<p>Error!</p>}>
            <PageClient />
          </ErrorBoundary>
        </Suspense>
      </HydrateClient>
    </div>
  );
}
