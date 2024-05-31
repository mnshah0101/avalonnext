"use client";
import React, { useState } from "react";

type Document = {
  _id: string;
  file_name: string;
};

type DocDropdownProps = {
  documents: Document[];
  updateSelectedDocs: (selectedDocument: Document) => void;
  selectedDocuments: Document[];
};

function DocDropdown({
  documents,
  updateSelectedDocs,
  selectedDocuments,
}: DocDropdownProps) {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (!documents) return null;

  // Filter items based on search term
  const items = documents.filter((item) =>
    item.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center">
      <div className="relative group">
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        >
          <span className="mr-2">
            {selectedDocuments.length + " documents selected"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-2 max-h-60 overflow-y-auto ">
            <input
              className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
              type="text"
              placeholder="Search items"
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <a
              key={"all"}
              onClick={() =>
                updateSelectedDocs({ _id: "all", file_name: "all" })
              }
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
            >
              All Documents
              {selectedDocuments.includes({ _id: "all", file_name: "all" }) && (
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </a>

            {items.map((item) => (
              <a
                key={item._id}
                onClick={() => updateSelectedDocs(item)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
              >
                <span className="">
                  {item.file_name.split("/")[1].substring(30, 45) +
                    (item.file_name.length > 70 ? "..." : "")}
                </span>
                {selectedDocuments.includes(item) && (
                  <svg
                    className="w-4 h-4 text-green-500 mx-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DocDropdown;
