import { ForwardedRef, forwardRef, useLayoutEffect, useRef, useState } from "react";
import SnackbarSubject from "../snackbar-subject";

type SnackbarType = {
  text?: string;
  status?: string;
  forwardRef?: ForwardedRef<any>;
};

function Snackbar({ text = "", status = "show", forwardRef }: SnackbarType) {
  return (
    <div ref={forwardRef} className={`snackbar ${status}`}>
      {text}
    </div>
  );
}

const SnackbarWithForwardRef = forwardRef((props: SnackbarType, ref) => (
  <Snackbar text={props.text} status={props.status} forwardRef={ref} />
));

export default function SnackbarWrap() {
  const [text, setText] = useState("");
  const ref = useRef(null);

  useLayoutEffect(() => {
    const sub = SnackbarSubject.subscribe((data) => {
      // @ts-ignore
      ref.current.classList.add("show");
      setText(data as string);

      // hide after 3s
      setTimeout(() => {
        // @ts-ignore
        ref.current.classList.remove("show");
      }, 3000);
    });

    return () => {
      sub.unsubscribe();
    };
  });

  return <SnackbarWithForwardRef ref={ref} text={text} status="" />;
}
