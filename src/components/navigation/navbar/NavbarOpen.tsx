type NavbarCodedProps = {
  onExit: () => void;
  children: React.ReactNode;
};

export default function NavbarOpen({ onExit, children }: NavbarCodedProps) {
  return (
    <>
      <div className="flex flex-row ">
        <div
          onMouseLeave={() => {
            onExit();
          }}
          className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r"
        >
          <div className="flex items-center justify-center h-14 border-b">
            <img
              src="/img/logos/black_only.png"
              alt="Logo"
              className="h-full"
            />
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm tracking-wide text-black font-medium">
                    Menu
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-black pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    {/* SVG Icon for Dashboard */}
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Dashboard
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/case/fadf"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-black pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    {/* SVG Icon for Cases */}
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Cases
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/rachel/fadf"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-black pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    {/* SVG Icon for Custom Path */}
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Rachel
                  </span>
                  <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-black bg-indigo-50 rounded-full">
                    New
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-content flex-grow">{children}</div>
      </div>
    </>
  );
}
