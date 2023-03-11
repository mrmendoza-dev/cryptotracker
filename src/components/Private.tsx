import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../assets/icons";

export default function Private(props: any) {
  return (
    <div className="Private">
      {props.hidden ? (
        <div className="hidden-cover">
          <div>{props.element}</div>
          <div className="hidden-icon">
            <FontAwesomeIcon icon={icons.faEyeSlash} />
          </div>
        </div>
      ) : (
        <div className="cover">{props.element}</div>
      )}
    </div>
  );
}
