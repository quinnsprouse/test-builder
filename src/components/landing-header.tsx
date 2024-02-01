"use client";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import { use, useState } from "react";

export default function LandingHeader() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();

  return (
    <header className="">
      <nav
        className="mx-auto flex items-center justify-between gap-x-6 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        {isLoaded && (
          <div className="flex flex-1 items-center justify-end gap-x-6">
            {isSignedIn ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => signOut(() => router.push("/"))}
                >
                  Log out
                </Button>
                <Button onClick={() => router.push("/build")}>Dashboard</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => router.push("/sign-in")}>
                  Login in
                </Button>
                <Button onClick={() => router.push("/sign-up")}>Sign up</Button>
              </>
            )}
            <ModeToggle />
          </div>
        )}
      </nav>
    </header>
  );
}
