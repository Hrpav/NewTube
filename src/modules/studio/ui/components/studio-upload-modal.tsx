"use client";

import { CheckCircle2, Loader2Icon, PlusIcon } from "lucide-react"
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast";

export const StudioUploadModal = () => {
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <span>Video Created</span>
          </div>
        )
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
