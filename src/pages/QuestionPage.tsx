import QuestionComponent from "../components/QuestionComponent";
import { useParams } from "react-router-dom";
import "./QuestionPage.scss";

export default function QuestionPage() {
  // @ts-ignore
  const { id } = useParams();

  return (
    <div className="QuestionPage my-4">
      <QuestionComponent id={id} showTags={true} showActions={true} defaultShowAnswers={true} />
    </div>
  );
}
