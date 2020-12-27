import { useCallback, useEffect, useState } from "react";
import { http } from "../http";
import { Question } from "../app.interface";
import dayjs from "dayjs";
import AnswersComponent from "./AnswersComponent";
import { ShowdownConverter } from "../util";
import { useHistory } from "react-router-dom";
import "./QuestionComponent.scss";
import { ReactComponent as PencilIcon } from "bootstrap-icons/icons/pencil-fill.svg";

function QuestionComponent({ id }: { id: string }) {
  const history = useHistory();
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
    <div className="QuestionComponent">
      <div className="title">{question.title}</div>
      <div className="meta">
        <a
          className="user"
          onClick={() => {
            history.push(`/users/${question.user?.email}`);
          }}
        >
          {question.user?.name}
        </a>
        <div className="updatedAt">{dayjs(question.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</div>
      </div>

      <div className="tags">
        {question.tags.map((item) => (
          <span key={item.id} className="item">
            {item.name}
          </span>
        ))}
      </div>

      <div
        className="description"
        dangerouslySetInnerHTML={{
          __html: ShowdownConverter.makeHtml(question.description),
        }}
      />

      <div className="actions">
        <button className="Button mr-2">关注</button>
        <button className="Button display-inline-flex justify-content-center align-items-center">
          <PencilIcon className="mr-1" /> 写回答
        </button>
      </div>

      <hr />

      <div className="Answers">
        <h4>Answers</h4>
        <AnswersComponent questionId={id} />
      </div>
    </div>
  );
}

export default QuestionComponent;
