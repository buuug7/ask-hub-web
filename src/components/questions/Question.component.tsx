import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../../http";
import { Question } from "../../app.interface";
import dayjs from "dayjs";
import AnswersComponent from "../answers/Answers.component";
import { ShowdownConverter } from "../../util";

function QuestionComponent() {
  // @ts-ignore
  const { id } = useParams();
  const [question, setQuestion] = useState<Question>({
    id: "",
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    tags: [],
  });

  const getQuestion = useCallback(async () => {
    const { data } = await http.get("/questions/" + id);
    setQuestion(data);
  }, [id]);

  useEffect(() => {
    getQuestion().then(() => {});
  }, [getQuestion]);

  return (
    <div className="Question">
      <h2>{question.title}</h2>
      <p>{dayjs(question.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
      <div>
        <h4>Tags: </h4>
        {question.tags.map((item) => (
          <span key={item.id} className="mx-1 p-1" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
            {item.name}
          </span>
        ))}
      </div>
      <div>
        <h4>User:</h4>
        <p>
          {question.user?.name} {question.user?.email}
        </p>
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: ShowdownConverter.makeHtml(question.description),
        }}
      />

      <div className="Answers">
        <h4>Answers</h4>
        <AnswersComponent questionId={id} />
      </div>
    </div>
  );
}

export default QuestionComponent;
