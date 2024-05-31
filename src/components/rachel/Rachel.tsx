import { useEffect, useState, useRef, ReactNode } from "react";
import { IoMdSend } from "react-icons/io";
import RachelMessage from "./RachelMessage";
import UserMessage from "./UserMessage";
import DocDropdown from "./DocDropdown";
import { io } from "socket.io-client";
import { FaFileContract } from "react-icons/fa";

type Case = {
  _id: string;
  case_title: string;
  documents: Document[];
  case_info: string;
  number_files: number;
  date: string;
};

type RachelProps = {
  myCase: Case;
  loading: boolean;
};

type Document = {
  _id: string;
  file_name: string;
};

const waitPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promise resolved");
    }, 500); // resolve after 0.5 seconds
  });
};

function getDateNow() {
  const date = new Date();

  const pad = (num: number) => String(num).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const timezoneOffset = -date.getTimezoneOffset();
  const sign = timezoneOffset >= 0 ? "+" : "-";
  const absOffset = Math.abs(timezoneOffset);
  const offsetHours = pad(Math.floor(absOffset / 60));
  const offsetMinutes = pad(absOffset % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
}

export default function Rachel({ myCase, loading }: RachelProps) {
  if (loading) {
    return <></>;
  }
  if (myCase.case_title === "empty" && !loading) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full text-center p-4"
        style={{ height: "80vh" }}
      >
        <div
          onClick={() => (window.location.href = "/dashboard/create")}
          style={{ width: "50vw", height: "30vh" }}
          className="hover:cursor-pointer hover:bg-gray-200  p-12 text-md border border-dashed rounded-xl flex flex-col justify-center items-center  bg-gray-100 text-gray-700"
        >
          <FaFileContract size={70} />

          <p className="my-5">
            Create your first case and upload documents to start chatting with
            Rachel.
          </p>
        </div>
      </div>
    );
  }

  const [messages, setMessages] = useState<ReactNode[]>([]);
  const [answering, setAnswering] = useState<boolean>(false);
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getChats();
    setSelectedDocuments(myCase.documents);
  }, [myCase]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    saveSelectedDocuments();
  }, [selectedDocuments]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadSelectedDocuments = () => {
    const savedDocuments = localStorage.getItem(
      `selectedDocuments_${myCase._id}`
    );
    if (savedDocuments) {
      setSelectedDocuments(JSON.parse(savedDocuments));
    } else {
      setSelectedDocuments(myCase.documents);
    }
  };

  const saveSelectedDocuments = () => {
    localStorage.setItem(
      `selectedDocuments_${myCase._id}`,
      JSON.stringify(selectedDocuments)
    );
  };

  const getChats = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GO_URL}/getCaseChat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            case_Id: myCase._id,
          }),
        }
      );

      const data = await response.json();

      const returned_messages = data.messages;

      const messages = returned_messages.map((message: any) => {
        if (message.sender === "user") {
          return <UserMessage text={message.text} time={message.timestamp} />;
        } else {
          return <RachelMessage text={message.text} time={message.timestamp} />;
        }
      });

      setMessages(messages);
    } catch (error) {
      console.error(error);
    }
  };

  const updateSelectedDocs = (selectedDocument: Document) => {
    if (selectedDocument._id === "all") {
      if (selectedDocuments.length === myCase.documents.length) {
        setSelectedDocuments([]);
      } else {
        setSelectedDocuments(myCase.documents);
      }
      return;
    }

    setSelectedDocuments((prevSelectedDocuments) => {
      const isSelected = prevSelectedDocuments.some(
        (doc) => doc._id === selectedDocument._id
      );
      if (isSelected) {
        return prevSelectedDocuments.filter(
          (doc) => doc._id !== selectedDocument._id
        );
      } else {
        return [...prevSelectedDocuments, selectedDocument];
      }
    });
  };

  const onButtonClick = async () => {
    try {
      const inputElement = document.getElementById(
        "rachel-input"
      ) as HTMLTextAreaElement;
      const text = inputElement?.value;

      if (!text) {
        return;
      }

      const userMessage = <UserMessage text={text} time={getDateNow()} />;
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      if (inputElement) {
        inputElement.value = "";
      }

      console.log("hitting getRachelResponse");

      await waitPromise();

      setAnswering(true);
      saveMessage(text, "user");

      getRachelResponse(text);
    } catch (error) {
      console.error(error);
      setAnswering(false);
    }
  };

  const updateLastMessage = (message: ReactNode) => {
    setMessages((prevChats) => {
      const updatedChats = [...prevChats];
      updatedChats[updatedChats.length - 1] = message;
      return updatedChats;
    });
  };

  const saveMessage = async (text: string, sender: string) => {
    try {
      const date = new Date();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GO_URL}/addMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            case_id: myCase._id,
            message: {
              text: text,
              sender: sender,
              timestamp: date.toISOString(),
            },
          }),
        }
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getRachelResponse = async (text: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      <RachelMessage text={"Thinking..."} time={getDateNow()} />,
    ]);

    const doc_links = selectedDocuments.map(
      (doc) => `https://avaloncasesbucket.s3.amazonaws.com/${doc.file_name}`
    );

    const socket = io("ws://127.0.0.1:8000");

    socket.on("connect", () => {
      socket.emit("rachel", {
        question: text,
        docs: doc_links,
        caseId: myCase._id,
        caseInfo: myCase.case_info,
      });

      socket.on("rachel", (data) => {
        if (data.done !== true) {
          updateLastMessage(
            <RachelMessage text={data.answer} time={getDateNow()} />
          );
        } else {
          saveMessage(data.answer, "rachel");
        }
      });
    });

    setAnswering(false);
  };

  return (
    <div className="container px-12 w-full">
      <div className="rachel-head flex justify-between mb-3">
        <h1 className="text-lg font-medium">{myCase.case_title}</h1>

        <DocDropdown
          documents={myCase.documents}
          updateSelectedDocs={updateSelectedDocs}
          selectedDocuments={selectedDocuments}
        />
      </div>
      <hr />
      <br />
      <div className="messages overflow-y-scroll" style={{ height: "75vh" }}>
        {messages}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="input-container justify-center flex flex-cols">
        <div className="border-2 justify-center flex flex-cols rounded-lg">
          <textarea
            className="textarea appearance-none border border-gray-500 rounded my-2 mx-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="rachel-input"
            cols={95}
            rows={2}
            style={{ fontSize: "0.75rem" }}
            placeholder="Ask Rachel something"
          ></textarea>
          <button
            className="scale-175 bg-white text-white font-bold py-2 px-4 rounded"
            onClick={onButtonClick}
            disabled={answering}
          >
            <IoMdSend color="black" />
          </button>
        </div>
      </div>
    </div>
  );
}
