import "./Button.scss";

function Button({
  text,
  status,
  onClick,
}: {
  text: string;
  status?: string[];
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className={`btn ${status?.join(" ")}`}>
      {text}
    </button>
  );
}

export default Button;
