
import { Percent } from "./Percent";

export default function Change(props: any) {

  return (
    <div className="Change">
      <Percent className="card-price-change" data={props.value}>
        {props.value > 0 ? (
          <i className="fa-solid fa-caret-up"></i>
        ) : (
          <i className="fa-solid fa-caret-down"></i>
        )}
        {props.value.toFixed(2)}%
      </Percent>
    </div>
  );
}

