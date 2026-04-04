"use client";

import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { MainSection } from "./main-section";
import { PersonalSection } from "./personal-section";

export const HomeSidebar = () => {
    return (
        <Sidebar className="pt-16 z-40 border-none" collapsible="icon"> 
            <SidebarContent className="bg-background">
                <MainSection />
                <Separator className="bg-gray-200 dark:bg-gray-800 my-2" />
                <PersonalSection />
            </SidebarContent>
        </Sidebar>
    )
}