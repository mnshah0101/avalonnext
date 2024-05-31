"use client";
import Navbar from "@/components/navigation/navbar/Navbar";
import Component from "@/components/case/upload/FileInput";
import { SessionProvider } from "next-auth/react";
export default function FileUpload() {
  return (
    <>
      <SessionProvider>
        <Navbar>
          <Component />
        </Navbar>
      </SessionProvider>
    </>
  );
}
