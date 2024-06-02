type RelevantDocsProps = {
  documents: {
    _id: string;
    file_name: string;
    case: string;
    file_url: string;
    relevancy: number;
    stored: boolean;
    date: string;
  }[];
};

function formatDateString(dateString: string): string {
  // Extract the timezone part and prepare the date string for parsing

  let date = dateString.slice(0, 11);

  return date;
}

export default function RelevantDocs({ documents }: RelevantDocsProps) {
  //sort documents by relevancy

  documents.sort((a, b) => b.relevancy - a.relevancy);

  return (
    <table className="table-auto w-full">
      <thead className="border-b border-gray-200 font-light bg-gray-100 text-gray-500">
        <tr className="text-left">
          <th scope="col" className="px-6 py-4">
            Document Reviewed
          </th>
          <th scope="col" className="px-6 py-4">
            Date Created
          </th>
          <th scope="col" className="px-6 py-4">
            Processed
          </th>
          <th scope="col" className="px-6 py-4">
            Relevancy
          </th>
        </tr>
      </thead>
      <tbody className="text-sm font-light">
        {documents.map((doc, index) => (
          <tr
            onClick={() => (window.location.href = `/file/${doc._id}`)}
            key={index}
            className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
          >
            <td className="px-6 py-4 font-medium" style={{ width: "50vh" }}>
              {doc.file_name.split("/")[1].slice(32)}
            </td>
            <td className="px-6 py-4" style={{ width: "30vh" }}>
              {formatDateString(doc.date)}
            </td>
            <td className="px-6 py-4" style={{ width: "30vh" }}>
              {doc.stored ? "Yes" : "No"}
            </td>
            <td className="px-6 py-4">
              <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-md font-medium ring-1 ring-inset ${
                  doc.relevancy < 33
                    ? "bg-red-50 text-red-700 ring-red-600/20"
                    : doc.relevancy < 66
                    ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
                    : "bg-green-50 text-green-700 ring-green-600/20"
                }`}
              >
                {doc.relevancy}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
