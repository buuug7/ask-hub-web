export default function Snackbar({ text = "", status = "show" }) {
  return <div className={`snackbar`}>{text}</div>;
}
