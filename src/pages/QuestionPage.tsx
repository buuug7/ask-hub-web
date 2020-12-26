import QuestionComponent from "../components/questions/Question.component";
import { useParams } from "react-router-dom";

export default function QuestionPage() {
  // @ts-ignore
  const { id } = useParams();

  return (
    <div className="QuestionPage">
      <QuestionComponent id={id} />
    </div>
  );
}
