"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResponsiveModal } from "@/components/responsive-modal";
import { StudioUploader } from "./studio-uploader";

export const StudioUploadModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ResponsiveModal
        title="Upload a video"
        open={open}
        onOpenChange={setOpen}
        contentClassName="bg-white text-black"
      >
        <StudioUploader />
      </ResponsiveModal>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <PlusIcon />
        Create
      </Button>
    </>
  );
};
