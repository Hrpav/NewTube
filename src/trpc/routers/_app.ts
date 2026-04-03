import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
// import { TRPCError } from '@trpc/server';
// import { auth } from '@clerk/nextjs/server';
 
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
//      const { userId } = await auth();
//      console.log("Hello", { userId });

      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
 
// export type definition of API
export type AppRouter = typeof appRouter;