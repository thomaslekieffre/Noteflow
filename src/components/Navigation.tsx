"use client";

import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 bg-background border-b">
      <Link href="/dashboard" className="font-bold text-xl">
        NoteFlow
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
