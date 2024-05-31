type UserMessageProps = {
  time: string;
  text: string;
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

    return `${formattedDate}`;
  } catch (e) {
    return dateTimeString;
  }
}

export default function UserMessage({ time, text }: UserMessageProps) {
  return (
    <div className="flex my-6 items-start">
      {" "}
      {/* Adjusted for alignment */}
      <div
        className="profile-picture mx-4"
        style={{ width: "2rem", height: "2rem" }} // Make height and width consistent
      >
        <img
          src="https://ui-avatars.com/api/?name=Moksh+Shah&background=00000&color=FFFFFF"
          height="100%"
          width="100%"
          alt="Mokshs profile"
          className="rounded-full"
        />{" "}
        {/* Adjust image size to fill container */}
      </div>
      <div
        className="message flex flex-col "
        style={{ flex: 1, minWidth: 0 }} // Flex grow and prevent overflow
      >
        <p className="message-user">Moksh</p>
        <p className="message-time">{parseDateTime(time)}</p>
        <div className="message-text" style={{ overflowWrap: "break-word" }}>
          {" "}
          {/* Use div instead of p and set wrapping */}
          {text}
        </div>
      </div>
    </div>
  );
}
