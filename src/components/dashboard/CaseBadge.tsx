const getTypeColor = (type: string) => {
  switch (type) {
    case "Civil":
      return "bg-blue-50 text-blue-800 ring-blue-600/20";
    case "Criminal":
      return "bg-red-50 text-red-800 ring-red-600/20";
    case "Family":
      return "bg-green-50 text-green-800 ring-green-600/20";
    case "Probate":
      return "bg-purple-50 text-purple-800 ring-purple-600/20";
    case "Tax":
      return "bg-orange-50 text-orange-800 ring-orange-600/20";
    case "Traffic":
      return "bg-yellow-200 text-yellow-800 ring-yellow-600/20";
    case "Other":
      return "bg-gray-50 text-gray-800 ring-gray-600/20";
    default:
      return "bg-gray-200 text-gray-800 ring-gray-600/20"; // default color if no type matches
  }
};

type BadgeProps = {
  caseType: string;
};

const Badge = ({ caseType }: BadgeProps) => (
  <span
    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getTypeColor(
      caseType
    )}`}
  >
    {caseType}
  </span>
);

export default Badge;
