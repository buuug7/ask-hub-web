import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";
import { Question } from "../../app.interface";
import dayjs from "dayjs";
import AnswersComponent from "../answers/Answers.component";

function QuestionComponent() {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question>();

  const fetchQuestion = async () => {
    const { data } = await http.get("/questions/" + id);
    setQuestion(data);
  };

  useEffect(() => {
    fetchQuestion().then(() => {});
  }, []);

  return (
    <div className="Question">
      <h4>{question?.title}</h4>
      <p>{dayjs(question?.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
      <p>{question?.description}</p>

      <div className="Answers">
        <h4>Answers</h4>
        <AnswersComponent questionId={id} />
      </div>
    </div>
  );
}

export default QuestionComponent;
