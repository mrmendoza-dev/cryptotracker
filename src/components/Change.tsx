import { Percent } from "./Percent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../assets/icons";

export default function Change(props: any) {
  return (
    <div className="Change">
      <Percent className="card-price-change" data={props.value}>
        {props.value > 0 ? (
          <FontAwesomeIcon icon={icons.faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={icons.faCaretDown} />
        )}
        {props.value.toFixed(2)}%
      </Percent>
    </div>
  );
}
