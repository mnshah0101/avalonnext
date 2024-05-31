import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
//date type file relevancy
export default function FilesTable() {
  return (
    <table className="min-w-full text-start text-sm font-light text-surface py-10 mt-10 table-fixed ">
      <thead className="border-b border-gray-200 font-light bg-gray-100 text-gray-500 ">
        <tr className="text-left">
          <th scope="col" className="w-1 px-6 py-4 ">
            Date
          </th>
          <th scope="col" className="w-1 px-6 py-4">
            Type
          </th>
          <th scope="col" className="w-100 px-6 py-4 ">
            File Name
          </th>
          <th scope="col" className="w-2 px-6 py-4 ">
            Relevancy
          </th>
          <th scope="col" className="w-1 py-4"></th>
          <th scope="col" className="w-1 py-4 "></th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-300">
          <td className="w-1 px-6 py-4 font-medium">
            {new Date().toLocaleDateString()}
          </td>
          <td className="px-6 w-1 py-4">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              PDF
            </span>
          </td>
          <td className="w-100  px-6 py-4">
            Case No. 2024-DIV-12345: Smith v. Smith - Petition for Dissolution
            of Marriage.pdf
          </td>
          <td className="w-2 px-6 py-4 flex justify-right">
            <span className="inline-flex items-center rounded-md bg-green-50 px-5 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              99
            </span>
          </td>
          <td className="w-1 px-2 py-4">
            <FaEye color="#6A7280" />
          </td>
          <td className="w-1 px-2 py-4">
            <FaTrash color="#6A7280" />
          </td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="w-1 px-6 py-4 font-medium">
            {new Date().toLocaleDateString()}
          </td>
          <td className="px-6 w-1 py-4">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              PDF
            </span>
          </td>
          <td className="w-100  px-6 py-4">
            Case No. 2024-DIV-12345: Smith v. Smith - Petition for Dissolution
            of Marriage.pdf
          </td>
          <td className="w-2 px-6 py-4 flex justify-right">
            <span className="inline-flex items-center rounded-md bg-green-50 px-5 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              99
            </span>
          </td>
          <td className="w-1 px-2 py-4">
            <FaEye color="#6A7280" />
          </td>
          <td className="w-1 px-2 py-4">
            <FaTrash color="#6A7280" />
          </td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="w-1 px-6 py-4 font-medium">
            {new Date().toLocaleDateString()}
          </td>
          <td className="px-6 w-1 py-4">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              PDF
            </span>
          </td>
          <td className="w-100  px-6 py-4">
            Case No. 2024-DIV-12345: Smith v. Smith - Petition for Dissolution
            of Marriage.pdf
          </td>
          <td className="w-2 px-6 py-4 flex justify-right">
            <span className="inline-flex items-center rounded-md bg-green-50 px-5 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              99
            </span>
          </td>
          <td className="w-1 px-2 py-4">
            <FaEye color="#6A7280" />
          </td>
          <td className="w-1 px-2 py-4">
            <FaTrash color="#6A7280" />
          </td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="w-1 px-6 py-4 font-medium">
            {new Date().toLocaleDateString()}
          </td>
          <td className="px-6 w-1 py-4">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              PDF
            </span>
          </td>
          <td className="w-100  px-6 py-4">
            Case No. 2024-DIV-12345: Smith v. Smith - Petition for Dissolution
            of Marriage.pdf
          </td>
          <td className="w-2 px-6 py-4 flex justify-right">
            <span className="inline-flex items-center rounded-md bg-green-50 px-5 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              99
            </span>
          </td>
          <td className="w-1 px-2 py-4">
            <FaEye color="#6A7280" />
          </td>
          <td className="w-1 px-2 py-4">
            <FaTrash color="#6A7280" />
          </td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="w-1 px-6 py-4 font-medium">
            {new Date().toLocaleDateString()}
          </td>
          <td className="px-6 w-1 py-4">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              PDF
            </span>
          </td>
          <td className="w-100  px-6 py-4">
            Case No. 2024-DIV-12345: Smith v. Smith - Petition for Dissolution
            of Marriage.pdf
          </td>
          <td className="w-2 px-6 py-4 flex justify-right">
            <span className="inline-flex items-center rounded-md bg-green-50 px-5 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              99
            </span>
          </td>
          <td className="w-1 px-2 py-4">
            <FaEye color="#6A7280" />
          </td>
          <td className="w-1 px-2 py-4">
            <FaTrash color="#6A7280" />
          </td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="w-1 px-6 py-4 font-medium">
            {new Date().toLocaleDateString()}
          </td>
          <td className="px-6 w-1 py-4">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              PDF
            </span>
          </td>
          <td className="w-100  px-6 py-4">
            Case No. 2024-DIV-12345: Smith v. Smith - Petition for Dissolution
            of Marriage.pdf
          </td>
          <td className="w-2 px-6 py-4 flex justify-right">
            <span className="inline-flex items-center rounded-md bg-green-50 px-5 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              99
            </span>
          </td>
          <td className="w-1 px-2 py-4">
            <FaEye color="#6A7280" />
          </td>
          <td className="w-1 px-2 py-4">
            <FaTrash color="#6A7280" />
          </td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="w-1 px-6 py-4 font-medium">
            {new Date().toLocaleDateString()}
          </td>
          <td className="px-6 w-1 py-4">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              PDF
            </span>
          </td>
          <td className="w-100  px-6 py-4">
            Case No. 2024-DIV-12345: Smith v. Smith - Petition for Dissolution
            of Marriage.pdf
          </td>
          <td className="w-2 px-6 py-4 flex justify-right">
            <span className="inline-flex items-center rounded-md bg-green-50 px-5 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              99
            </span>
          </td>
          <td className="w-1 px-2 py-4">
            <FaEye color="#6A7280" />
          </td>
          <td className="w-1 px-2 py-4">
            <FaTrash color="#6A7280" />
          </td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="w-1 px-6 py-4 font-medium">
            {new Date().toLocaleDateString()}
          </td>
          <td className="px-6 w-1 py-4">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              PDF
            </span>
          </td>
          <td className="w-100  px-6 py-4">
            Case No. 2024-DIV-12345: Smith v. Smith - Petition for Dissolution
            of Marriage.pdf
          </td>
          <td className="w-2 px-6 py-4 flex justify-right">
            <span className="inline-flex items-center rounded-md bg-green-50 px-5 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              99
            </span>
          </td>
          <td className="w-1 px-2 py-4">
            <FaEye color="#6A7280" />
          </td>
          <td className="w-1 px-2 py-4">
            <FaTrash color="#6A7280" />
          </td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="w-1 px-6 py-4 font-medium">
            {new Date().toLocaleDateString()}
          </td>
          <td className="px-6 w-1 py-4">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              PDF
            </span>
          </td>
          <td className="w-100  px-6 py-4">
            Case No. 2024-DIV-12345: Smith v. Smith - Petition for Dissolution
            of Marriage.pdf
          </td>
          <td className="w-2 px-6 py-4 flex justify-right">
            <span className="inline-flex items-center rounded-md bg-green-50 px-5 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              99
            </span>
          </td>
          <td className="w-1 px-2 py-4">
            <FaEye color="#6A7280" />
          </td>
          <td className="w-1 px-2 py-4">
            <FaTrash color="#6A7280" />
          </td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="w-1 px-6 py-4 font-medium">
            {new Date().toLocaleDateString()}
          </td>
          <td className="px-6 w-1 py-4">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              PDF
            </span>
          </td>
          <td className="w-100  px-6 py-4">
            Case No. 2024-DIV-12345: Smith v. Smith - Petition for Dissolution
            of Marriage.pdf
          </td>
          <td className="w-2 px-6 py-4 flex justify-right">
            <span className="inline-flex items-center rounded-md bg-green-50 px-5 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              99
            </span>
          </td>
          <td className="w-1 px-2 py-4">
            <FaEye color="#6A7280" />
          </td>
          <td className="w-1 px-2 py-4">
            <FaTrash color="#6A7280" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
