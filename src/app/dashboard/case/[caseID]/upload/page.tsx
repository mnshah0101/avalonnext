"use client";
import Navbar from "@/components/navigation/navbar/Navbar";
import FileInput from "@/components/case/upload/FileInput";
import { SessionProvider } from "next-auth/react";
export default function FileUpload() {
  return (
    <>
      <SessionProvider>
        <Navbar>
          <FileInput />
        </Navbar>
      </SessionProvider>
    </>
  );
}
