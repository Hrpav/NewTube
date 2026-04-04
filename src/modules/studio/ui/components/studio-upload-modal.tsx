"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const StudioUploadModal = () => {
    return (
        <Button variant="secondary" className="hover:bg-slate-100">
            <PlusIcon />
            Create
        </Button>
    )
}