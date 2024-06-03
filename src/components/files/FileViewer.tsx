import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useState, useEffect } from "react";

type FileViewerProps = {
  file_id: string;
};

type Doc = {
  uri: string;
  fileType: string;
};

function FileViewer({ file_id }: FileViewerProps) {
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
        window.location.href = "/dashboard";
      }
    };

    fetchFileData();
  }, [file_id]);

  return (
    <div
      className="container-div flex flex-col justify-center items-center mt-4"
      style={{ height: "100vh", width: "100%" }}
    >
      <h1 className="text-3xl">
        {file_name && file_name.split("/")[1].slice(30)}
      </h1>

      <DocViewer
        style={{ height: "90vh", width: "100%" }}
        prefetchMethod="GET"
        documents={docs}
        config={{ header: { disableHeader: true } }}
        pluginRenderers={DocViewerRenderers}
      />
    </div>
  );
}

export default FileViewer;
