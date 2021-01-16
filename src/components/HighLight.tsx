import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

export default function HighLight({ content }: { content: string }) {
  const ref = useRef(null);
  const updateCodeHighLight = () => {
    // @ts-ignore
    ref.current.querySelectorAll("pre code").forEach((block) => {
      // @ts-ignore
      hljs.highlightBlock(block);
    });
  };

  useEffect(() => {
    updateCodeHighLight();
  }, []);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: content }} />;
}
