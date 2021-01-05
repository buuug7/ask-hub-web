import ReactMde, { ReactMdeProps } from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { ShowdownConverter } from "../util";
// @ts-ignore
import { zhL18n } from "react-mde/lib/js/l18n/react-mde.zh-CN";

export default function ReactMdeWrap(props: Partial<ReactMdeProps>) {
  return (
    <ReactMde
      {...props}
      generateMarkdownPreview={(markdown) => Promise.resolve(ShowdownConverter.makeHtml(markdown))}
      l18n={zhL18n}
    />
  );
}
