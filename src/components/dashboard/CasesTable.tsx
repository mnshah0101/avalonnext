import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loader from "./Loader";
import Badge from "./CaseBadge";

function hyperlink(id: string) {
  window.location.href = `dashboard/case/${id}`;
}

export default function CasesTable() {
  const [cases, setCases] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const { data: session, status } = useSession();

  async function getCases() {
    try {
      if (status === "loading") return;

      localStorage.removeItem("cases");

      const localCases = localStorage.getItem("cases");
      if (localCases) {
        setCases(JSON.parse(localCases));
        setLoading(false);
        return; // Exit if cases were loaded successfully
      }

      // Fetch cases from API if not found in local storage
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GO_URL}/getUserCases`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: session?.user?.id,
          }),
        }
      );

      console.log("This is the response", response);

      const data = await response.json();

      console.log("This is the data", data);

      setCases(data.object);
      setLoading(false);
      console.log("setting page loading to false");
      // Save the fetched cases to local storage
      localStorage.setItem("cases", JSON.stringify(data.object));
    } catch (error) {
      console.log("This is the error", error);
    }
  }

  useEffect(() => {
    getCases();
  }, [status]);

  const confirmDelete = (id: string) => {
    setSelectedCaseId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedCaseId) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GO_URL}/deleteCaseById`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: selectedCaseId,
          }),
        }
      );

      if (response.status === 200) {
        // Remove the case from the cases list
        const updatedCases = cases.filter((c: any) => c._id !== selectedCaseId);
        setCases(updatedCases);
        localStorage.setItem("cases", JSON.stringify(updatedCases));
        console.log("Case deleted successfully");
      }
    } catch (error) {
      console.log("Error deleting case: ", error);
    }

    setShowModal(false);
    setSelectedCaseId(null);
  };

  if (loading) {
    return <Loader display={loading} />;
  }

  return (
    <div>
      {cases.length === 0 ? (
        <div className="flex items-center justify-center  h-64">
          <p className="text-gray-500 text-lg">Create your first case</p>
        </div>
      ) : (
        <table className="min-w-full text-start text-sm font-light text-surface py-10 mt-10 table-fixed">
          <thead className="border-b border-gray-200 font-light bg-gray-100 text-gray-500">
            <tr className="text-left">
              <th scope="col" className="w-1 px-6 py-4">
                Date
              </th>
              <th scope="col" className="w-1 px-6 py-4">
                Type
              </th>
              <th scope="col" className="w-100 px-6 py-4">
                Case
              </th>
              <th scope="col" className="w-2 px-6 py-4">
                Files
              </th>
              <th scope="col" className="w-1 py-4"></th>
              <th scope="col" className="w-1 py-4 "></th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c: any) => (
              <tr
                className="border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
                key={c._id}
              >
                <td
                  onClick={() => hyperlink(c._id)}
                  className="w-1 px-6 py-4 font-medium"
                >
                  {c.date.substring(0, 10)}
                </td>
                <td onClick={() => hyperlink(c._id)} className="px-6 w-1 py-4">
                  <Badge caseType={c.case_type} />
                </td>
                <td
                  onClick={() => hyperlink(c._id)}
                  className="w-100 px-6 py-4"
                >
                  {c.case_title}
                </td>
                <td onClick={() => hyperlink(c._id)} className="w-2 px-6 py-4">
                  {c.number_files}{" "}
                </td>
                <td onClick={() => hyperlink(c._id)} className="w-1 px-2 py-4">
                  <FaEye color="#6A7280" />
                </td>
                <td
                  onClick={() => confirmDelete(c._id)}
                  className="w-1 px-2 py-4"
                >
                  <FaTrash color="#6A7280" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this case?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
