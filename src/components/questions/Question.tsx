import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";
import { Question as QuestionInterFace } from "../../app.interface";
import dayjs from "dayjs";

function Question() {
  const { id } = useParams();
  const [question, setQuestion] = useState<QuestionInterFace>();

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
    </div>
  );
}

export default Question;
