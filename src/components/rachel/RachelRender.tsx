import RachelNavbar from "../navigation/navbar/RachelNavbar";
import Rachel from "./Rachel";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loader from "../dashboard/Loader";

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

let initialCase: Case = {
  _id: "",
  case_title: "",
  documents: [],
  case_info: "",
  number_files: 0,
  date: "",
};

export default function RachelRender() {
  const { data: session, status } = useSession();
  const [cases, setCases] = useState<Case[]>([]);
  const [myCase, setMyCase] = useState<Case>(initialCase);
  const [loading, setLoading] = useState<boolean>(false);

  let authenticated = false;

  async function getCases() {
    try {
      if (status !== "unauthenticated" && status !== "authenticated") {
        return <Loader display={true} />;
      }

      if (status === "unauthenticated") {
        window.location.href = "/login";
      }

      const localCases = localStorage.getItem("cases");
      if (localCases) {
        console.log("local cases", localCases);
        const parsedCases = JSON.parse(localCases);
        setCases(parsedCases);
        if (parsedCases.length > 0) {
          updateCase(parsedCases[0]);
        } else {
          setMyCase({
            _id: "",
            case_title: "empty",
            documents: [],
            case_info: "",
            number_files: 0,
            date: "",
          });
        }
        return;
      }

      // Fetch cases from API if not found in local storage
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GO_URL}/getUserCases`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: session?.user?.id,
          }),
        }
      );

      const data = await response.json();

      let returnedCases = data.object;

      console.log("there are cases", returnedCases);

      setCases((prevCases) => [...returnedCases]);

      localStorage.setItem("cases", JSON.stringify(returnedCases));

      console.log("returned cases");
      console.log(returnedCases);

      if (returnedCases.length > 0) {
        updateCase(returnedCases[0]);
      } else {
        setMyCase({
          _id: "",
          case_title: "empty",
          documents: [],
          case_info: "",
          number_files: 0,
          date: "",
        });
      }
    } catch (error) {
      console.log("This is the error", error);
    }
  }

  async function updateCase(updatedCase: Case) {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GO_URL}/getCaseDocuments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            case_id: updatedCase._id,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      updatedCase.documents = data.object;

      setMyCase(updatedCase);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("This is the error", error);
    }
  }

  useEffect(() => {
    getCases();
  }, [status]);

  if (status !== "unauthenticated" && status !== "authenticated") {
    return <Loader display={true} />;
  }

  if (status === "unauthenticated") {
    window.location.href = "/login";
  }

  if (status === "authenticated") {
    authenticated = true;
  }

  return (
    <>
      {authenticated && (
        <RachelNavbar
          key={myCase._id}
          myCase={myCase}
          updateCase={updateCase}
          cases={cases}
        >
          <Rachel loading={loading} key={myCase._id} myCase={myCase} />
        </RachelNavbar>
      )}
    </>
  );
}
