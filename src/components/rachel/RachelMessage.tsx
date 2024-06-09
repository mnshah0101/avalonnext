"use client";

function removeAnswerString(input: string): string {
  return input.replace(/Answer:/g, "");
}
type RachelMessageProps = {
  time: string;
  text: string;
  handleFile: (fileId: string) => void;
};

function parseDateTime(dateTimeString: string): string {
  try {
    const date = new Date(dateTimeString);

    // Format date and time as desired
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString(undefined, options);

    return `${formattedDate}`;
  } catch (e) {
    return dateTimeString;
  }
}

export default function RachelMessage({
  time,
  text,
  handleFile,
}: RachelMessageProps) {
  const renderMessageWithLinks = (message: string) => {
    const parts = message.split(/(\(file_identifier:[^)]+\))/);

    return parts.map((part, index) => {
      if (part.startsWith("(file_identifier:")) {
        // Remove spaces
        part = part.replace(" ", "");

        const fileId = part.slice(17, -1); // Extract the ID
        return (
          <span
            key={index}
            className="clickable-text text-black font-bold cursor-pointer"
            onClick={() => handleFile(fileId)}
          >
            {" "}
            View Document{" "}
          </span>
        );
      }
      // Turn the rest of the message into JSX code
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  return (
    <div className="flex my-6 items-start">
      <div
        className="profile-picture mx-4"
        style={{ width: "2rem", height: "2rem" }}
      >
        <img
          src="/img/logos/black_rachel.png"
          height="100%"
          width="100%"
          alt="Rachel's profile"
        />
      </div>
      <div className="message flex flex-col" style={{ flex: 1, minWidth: 0 }}>
        <p className="message-user">Rachel</p>
        <p className="message-time">{parseDateTime(time)}</p>
        <div className="message-text" style={{ overflowWrap: "break-word" }}>
          {renderMessageWithLinks(removeAnswerString(text))}
        </div>
      </div>
    </div>
  );
}
