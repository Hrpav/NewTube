"use client";

import { Loader2Icon, PlusIcon } from "lucide-react"

import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast";

export const StudioUploadModal = () => {
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Video created",
      });
      utils.studio.getMany.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Button variant="secondary" onClick={() => create.mutate()} disabled={create.isPending}>
      {create.isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
      Create
    </Button>
  );
};
