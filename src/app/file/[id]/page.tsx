"use client";
import Navbar from "@/components/navigation/navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import FileViewer from "@/components/files/FileViewer";
import { usePathname } from "next/navigation";

export default function FilePage() {
  //get file id from path name

  const pathname = usePathname();

  const file_id = pathname.split("/").pop() || "";

  return (
    <div>
      <SessionProvider>
        <Navbar>
          <FileViewer file_id={file_id} />
        </Navbar>
      </SessionProvider>
    </div>
  );
}
