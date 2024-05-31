"use client";
import Navbar from "@/components/navigation/navbar/Navbar";
import CreatePage from "@/components/dashboard/CreatePage";
import { SessionProvider } from "next-auth/react";

export default function CreateCasePage() {
  return (
    <SessionProvider>
      <div>
        <Navbar>
          <h1 className="text-2xl py-10">Create a New Case</h1>
          <CreatePage />
        </Navbar>
      </div>
    </SessionProvider>
  );
}
