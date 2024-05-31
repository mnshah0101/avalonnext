"use client";
import Navbar from "@/components/navigation/navbar/Navbar";
import FilesView from "@/components/files/FilesView";
import { SessionProvider } from "next-auth/react";
export default function FilesPage() {
  return (
    <>
      <SessionProvider>
        <Navbar>
          <FilesView />
        </Navbar>
      </SessionProvider>
    </>
  );
}
