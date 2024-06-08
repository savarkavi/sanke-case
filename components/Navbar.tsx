"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="h-full flex items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold text-lg">
            <span className="text-green-600">snake</span>case
          </Link>
          <div>
            {!isLoaded ? (
              <Skeleton className="w-24 h-8 rounded-lg bg-gray-400" />
            ) : isSignedIn ? (
              <div className="flex items-center gap-5">
                <UserButton />
                <Button className="bg-green-500 hover:bg-green-600" size="sm">
                  <Link href="/configure/upload">Create Case</Link>
                </Button>
              </div>
            ) : (
              <Button className="bg-green-500 hover:bg-green-600" size="sm">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
