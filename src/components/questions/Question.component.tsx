import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../../http";
import { Question } from "../../app.interface";
import dayjs from "dayjs";
import AnswersComponent from "../answers/Answers.component";
import { ShowdownConverter } from "../../util";

function QuestionComponent() {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question>({
    id: "",
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
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
      <h4>{question.title}</h4>
      <p>{dayjs(question.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
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
