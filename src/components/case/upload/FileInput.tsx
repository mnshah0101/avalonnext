"use client";
import React, { useEffect, useState } from "react";
import Uppy, { UppyFile } from "@uppy/core";
import Transloadit from "@uppy/transloadit";
import GoogleDrive from "@uppy/google-drive";
import Dropbox from "@uppy/dropbox";
import OneDrive from "@uppy/onedrive";
import Box from "@uppy/box";
import { Dashboard } from "@uppy/react";
import { COMPANION_URL, COMPANION_ALLOWED_HOSTS } from "@uppy/transloadit";
import dotenv from "dotenv";
import { usePathname } from "next/navigation";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

dotenv.config();

function extractIdFromPath(pathname: string): string {
  const pathArray = pathname.split("/");
  const case_id = pathArray[pathArray.length - 1 - 1];
  return case_id;
}

function Component() {
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  console.log(pathname);

  const case_id = extractIdFromPath(pathname);

  console.log(case_id);

  const [error, setError] = useState("");

  const [uppy] = useState(() => new Uppy());
  const [files, setFiles] = useState<any>([]);
  const formData = new FormData();

  useEffect(() => {
    uppy.setOptions({
      restrictions: { allowedFileTypes: [".pdf", ".txt", ".doc", ".docx"] },
    });
  }, []);

  useEffect(() => {
    uppy.on("file-added", (file) => {
      setFiles((files: any) => [...files, file]);
      console.log(files);
    });
    //filter our duplicates
    uppy.on("upload", async (data) => {
      try {
        if (case_id === null) {
          setError("Case ID not found");
          return;
        }
        setError("");
        setLoading(true);
        const filteredFiles = files.filter(
          (file: UppyFile, index: number, self: UppyFile[]) =>
            index === self.findIndex((t) => t.name === file.name)
        );
        const formData = new FormData();

        for (let i = 0; i < filteredFiles.length; i++) {
          formData.append("files[]", filteredFiles[i].data);
        }

        formData.append("case_id", case_id);

        const res = await fetch(
          process.env.NEXT_PUBLIC_GO_URL + "/createDocuments",
          {
            method: "POST",
            body: formData,
          }
        );

        let data = await res.json();

        console.log("this is the data");

        console.log(data);

        if (res.status != 200) {
          console.log(data);
          setError("An error occured, please try again");
          setLoading(false);
          return;
        }

        localStorage.removeItem("cases");

        window.location.href = "/dashboard/case/" + case_id;
        setLoading(false);

        console.log(res);
      } catch (error) {
        setLoading(false);
        setError("An error occured, please try again");
        console.error(error);
      }
    });
  });

  return (
    <div className="dashboard-container ">
      <div className="py-5 ml-12 pl-4 flex">
        <h3 className="text-xl font-medium ">Upload Files </h3>
        {loading && (
          <span className="ml-5">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </span>
        )}
        {error && (
          <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full ml-3">
            {error}
          </span>
        )}
      </div>

      <hr className="py-5 ml-12 pl-4" />

      <div
        className=" flex justify-center items-start"
        style={{ width: "100%", height: "80vh" }}
      >
        <Dashboard
          uppy={uppy}
          height={"42rem"}
          width={"70vw"}
          plugins={["GoogleDrive", "Dropbox", "OneDrive", "Box"]}
        />
      </div>
    </div>
  );
}

export default Component;