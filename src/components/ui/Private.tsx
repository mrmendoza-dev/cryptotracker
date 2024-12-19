import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@/assets/icons";

export const Private = ({ hidden, element }: any) => {
  return (
    <div>
      {hidden ? (
        <div className="relative bg-gray-100 dark:bg-gray-800 rounded select-none">
          <div className="invisible">{element}</div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm opacity-70">
            <FontAwesomeIcon icon={faEyeSlash} />
          </div>
        </div>
      ) : (
        <div>{element}</div>
      )}
    </div>
  );
}
