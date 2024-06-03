"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navigation/navbar/Navbar";
import CaseStat from "@/components/case/CaseStat";
import RelevantDocs from "@/components/case/RelevantDocs";
import { SessionProvider } from "next-auth/react";
import Loader from "@/components/dashboard/Loader";

interface Case {
  id: string;
  case_title: string;
  documents: Document[];
  attorney_first_name: string;
  attorney_last_name: string;
  case_info: string;
  case_type: string;
  number_files: number;
  seed_doc: string;
  judge_name: string;
  city: string;
  date: string;
}

type Document = {
  _id: string;
  file_name: string;
  case: string;
  file_url: string;
  relevancy: number;
  stored: boolean;
  date: string;
};

let originalCase: Case = {
  id: "",
  case_title: "",
  documents: [],
  attorney_first_name: "",
  attorney_last_name: "",
  case_info: "",
  case_type: "",
  city: "",
  date: "",
  judge_name: "",
  number_files: 0,
  seed_doc: "",
};

export default function CasePage() {
  const pathname = usePathname();
  const caseId = pathname.split("/")[3];

  const [myCase, setCase] = useState<Case>(originalCase);

  const [totalDocuments, setTotalDocuments] = useState<number>(0);
  const [totalProcessing, setTotalProcessing] = useState<number>(0);
  const [averageRelevancy, setAverageRelevancy] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  async function getCase() {
    try {
      let response = await fetch(`${process.env.NEXT_PUBLIC_GO_URL}/getCase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: caseId,
        }),
      });

      if (response.status === 500) {
        window.location.href = "/dashboard";
        return;
      }

      let data = await response.json();
      let myCase = data.object;

      //get documents for the case

      response = await fetch(
        `${process.env.NEXT_PUBLIC_GO_URL}/getCaseDocuments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            case_id: caseId,
          }),
        }
      );

      data = await response.json();

      myCase.documents = data.object;

      setCase(myCase);
      setLoading(false);

      let totalDocs = 0;
      let totalRelevancy = 0;
      let totalProcessing = 0;

      myCase.documents.forEach((doc: { relevancy: number; stored: any }) => {
        totalDocs++;
        totalRelevancy += Number(doc.relevancy);
        if (!doc.stored) {
          totalProcessing++;
        }
      });

      if (totalDocs === 0) {
        setTotalDocuments(0);
        setTotalProcessing(0);
        setAverageRelevancy(0);
        return;
      }

      setTotalDocuments(totalDocs);
      setTotalProcessing(totalProcessing);
      setAverageRelevancy(Math.round((totalRelevancy / totalDocs) * 100) / 100);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getCase();
  }, []);

  if (loading) {
    return <Loader display={loading} />;
  }

  return (
    <div>
      <SessionProvider>
        <Navbar>
          <div className="case-main-container h-full w-full flex flex-col justify-center items-start ml-10 ">
            <div className="button-div w-full flex justify-between items-end">
              <div className=" pt-5">
                <h1 className="text-2xl mb-5 font-bold ">
                  {myCase.case_title}{" "}
                </h1>
                <button
                  style={{ height: "2.5rem" }}
                  className=" text-white  bg-black  px-3 rounded-lg  hover:bg-gray-600"
                  onClick={() =>
                    (window.location.href = `/dashboard/case/${caseId}/`)
                  }
                >
                  Refresh
                </button>
              </div>
              <div>
                <button
                  style={{ height: "2.5rem" }}
                  className=" text-white mx-4 bg-black py-0 px-3 rounded-lg mt-12 hover:bg-gray-600"
                  onClick={() =>
                    (window.location.href = `/dashboard/case/${caseId}/upload`)
                  }
                >
                  Upload Files
                </button>
              </div>
            </div>
            <div className="case-stats h-full  flex">
              <CaseStat
                total_documents={totalDocuments}
                average_relevancy={averageRelevancy}
                processing={totalProcessing}
              />
            </div>

            <div className="  case-drafted-documents h-full w-full py-10 pr-4">
              <RelevantDocs documents={myCase.documents} />
            </div>
          </div>
        </Navbar>
      </SessionProvider>
    </div>
  );
}
