"use client";

type Document = {
  _id: string;
  file_name: string;
};

type Case = {
  _id: string;
  case_title: string;
  documents: Document[];
  case_info: string;
  number_files: number;
  date: string;
};

type NavbarProps = {
  children: React.ReactNode;
  cases: Case[];
  updateCase: (arg0: Case) => void;
  myCase: Case;
};

export default function RachelNavbar({
  children,
  cases,
  myCase,
  updateCase,
}: NavbarProps) {
  return (
    <>
      <div className="flex flex-row ">
        <div className="fixed flex flex-col top-0 left-0 w-64 bg-black h-full border-r">
          <div
            className="flex items-center justify-center h-14 border-b "
            onClick={() => (window.location.href = "/dashboard")}
          >
            <img src="/img/logos/white_only.png" alt="" className="h-full" />
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow bg-black text-white">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5">
                <div className="flex flex-col h-8 items-left mb-10">
                  <button
                    onClick={() => (window.location.href = "/dashboard/create")}
                    className="bg-white hover:bg-grey-700 text-black text-sm py-2 px-4 rounded"
                  >
                    Create Case +
                  </button>
                  <div className="text-sm tracking-wide text-white font-medium my-4">
                    Cases
                  </div>
                </div>
              </li>
              {cases.length > 0 &&
                cases.map((c, index) => (
                  <li key={index} onClick={() => updateCase(c)}>
                    <a
                      className={`relative flex flex-row items-center h-11 focus:outline-none ${
                        myCase._id === c._id
                          ? "bg-gray-50 text-gray-800 border-black"
                          : "hover:bg-gray-50 hover:text-gray-800 hover:border-black"
                      } border-l-4 border-transparent pr-6 hover:cursor-pointer`}
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          ></path>
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        {c.case_title}
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="main-content-rachel">{children}</div>
      </div>
    </>
  );
}
