import { useEffect, useRef } from "react";
import { ReactComponent as CloseIcon } from "bootstrap-icons/icons/x.svg";
import "./Modal.scss";

type ModalProps = {
  close: Function;
  children: any;
  title?: string;
  custom?: boolean; // 自定义modal中的内容
  outsideDismiss?: boolean; // 点击modal外的区域关闭
};
export default function Modal({
  close,
  children,
  title,
  custom = false,
  outsideDismiss = true,
}: ModalProps) {
  const ref = useRef(null);

  useEffect(() => {
    const modalMask = document.createElement("div");
    modalMask.classList.add("modalMask", "show");
    document.body.classList.add("modalOpen");
    document.body.append(modalMask);

    if (outsideDismiss) {
      document.addEventListener("click", (e) => {
        if (ref.current === e.target) {
          close();
        }
      });
    }

    return () => {
      document.body.classList.remove("modalOpen");
      document.body.removeChild(modalMask);
    };
  });

  let body = (
    <>
      <div className="modalHeader">
        <div className="title">{title ? title : "My modal"}</div>
        <button className="btn" onClick={() => close()}>
          <CloseIcon />
        </button>
      </div>
      <div className="modalBody">{children}</div>
    </>
  );

  if (custom) {
    body = children;
  }

  return (
    <div className="Modal show" ref={ref}>
      <div className="modalDialog">{body}</div>
    </div>
  );
}
