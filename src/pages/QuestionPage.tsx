import Question from "../components/Question";
import { useParams } from "react-router-dom";
import "./QuestionPage.scss";

export default function QuestionPage() {
  // @ts-ignore
  const { id } = useParams();

  return (
    <div className="QuestionPage my-4">
      <Question id={id} showTags={true} showActions={true} defaultShowAnswers={true} />
    </div>
  );
}
