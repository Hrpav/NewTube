"use client";

import { Button } from "@/components/ui/button";
import { Clapperboard, ClapperboardIcon, UserCircleIcon } from "lucide-react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const AuthButton = () => {
  return (
    <>
      <SignedIn>
        {/*
        <Button asChild variant="secondary">
          <Link href="/studio"
          <ClapperboardIcon />
            Studio
          </Link>
        */}
        <UserButton>
          <UserButton.MenuItems>
            {/* TODO: Add user profile menu button*/}
            <UserButton.Action label="manageAccount"/>
            <UserButton.Link
              label="Studio"
              href="/studio"
              labelIcon={<ClapperboardIcon className="size-4" />}
            />
            <UserButton.Action label="signOut" />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none [&_svg]:size-4"
          >
            <UserCircleIcon />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
