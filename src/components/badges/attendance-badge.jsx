import { GoCheckCircle, GoClock, GoXCircle, GoAlert } from "react-icons/go";

export default function AttendanceBadge({ status }) {
  const styles = {
    present: "bg-green-100 text-green-700 border-green-200",
    late: "bg-yellow-100 text-yellow-700 border-yellow-200",
    absent: "bg-red-100 text-red-700 border-red-200",
    mismatch: "bg-orange-100 text-orange-700 border-orange-200",
  };

  const icons = {
    present: <GoCheckCircle />,
    late: <GoClock />,
    absent: <GoXCircle />,
    mismatch: <GoAlert />,
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full border flex items-center gap-1 w-fit ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {icons[status]} <span className="capitalize">{status}</span>
    </span>
  );
}
