"use client";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useState, useEffect } from "react";

type FileViewerProps = {
  file_id: string;
  onClose: () => void;
};

type Doc = {
  uri: string;
  fileType: string;
};

function FileViewerRachel({ file_id, onClose }: FileViewerProps) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [file_name, setFileName] = useState("");

  // Fetch file data
  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_GO_URL + `/getDocumentById`,
          {
            method: "POST",
            body: JSON.stringify({ _id: file_id }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          console.log("Failed to fetch file data");
          throw new Error("Failed to fetch file data");
        }

        const data = await res.json();

        setDocs([
          {
            uri: data.object.file_url,
            fileType: data.object.file_name.slice(-3),
          },
        ]);
        setFileName(data.object.file_name);
      } catch (error) {
        console.error("Error fetching file data: ", error);
        //take me back to the dashboard
        window.location.href = "/rachel";
      }
    };

    fetchFileData();
  }, [file_id]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full relative">
        <button
          className="absolute top-2 right-2 bg-black text-white rounded-full p-2 text-xs"
          onClick={() => onClose()}
        >
          Close
        </button>
        <h1 className="text-2xl mb-4">
          {file_name && file_name.split("/")[1].slice(32)}
        </h1>
        <DocViewer
          style={{ height: "60vh" }}
          documents={docs}
          config={{ header: { disableHeader: true } }}
          pluginRenderers={DocViewerRenderers}
        />
      </div>
    </div>
  );
}

export default FileViewerRachel;
