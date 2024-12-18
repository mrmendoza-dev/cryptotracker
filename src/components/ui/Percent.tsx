import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

export const Percent = ({
  value,
  className = "",
}: {
  value: any;
  className?: string;
}) => {
  const colorClass =
    value === 0
      ? "text-gray-500"
      : value > 0
      ? "text-emerald-500"
      : "text-red-500";

  const formattedValue = Number(value).toFixed(2);

  return (
    <p className={`flex items-center ${colorClass} ${className}`}>
      {value > 0 ? (
        <FontAwesomeIcon icon={faCaretUp} className="mr-0.5" />
      ) : (
        <FontAwesomeIcon icon={faCaretDown} className="mr-0.5" />
      )}
      {formattedValue}%
    </p>
  );
};
