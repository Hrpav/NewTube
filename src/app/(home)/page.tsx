import { HydrateClient, trpc } from "@/trpc/server";
import { PageClient } from "./client";

// im not sure if you need async on the void trpc one?
// but if i remove async its not gonna throw any errors/warnings
// ill use async everywhere lol
export default async function Home() {
//  const data = await trpc.hello({ text: "Hrpavi" }); // SERVER COMPONENT FETCHING FROM THE DATA
                                                     // WITHOUT "use client";
    void trpc.hello.prefetch({ text: "Hrpavi" });

  return (
    <div>
      <HydrateClient>
        <PageClient />
      </HydrateClient>
    </div>
  );
};