

export default function Private(props: any) {
  return (
    <div className="Private">
      {props.hidden ? (
        <div className="hidden-cover">
          <p>{props.element}</p>
          <div className="hidden-icon">
            <i className="fa-solid fa-eye-slash"></i>
          </div>
        </div>
      ) : (
        <div className="cover">{props.element}</div>
      )}
    </div>
  );
}