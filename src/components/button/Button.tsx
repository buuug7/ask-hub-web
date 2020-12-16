import "./Button.scss";

type MyButtonPropsType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function Button(props: MyButtonPropsType) {
  return <button {...props}>{props.children}</button>;
}

export default Button;
