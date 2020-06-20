import React, { useEffect, useState } from "react";
import { Answer } from "../../app.interface";
import http from "../../http";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function AnswerComponent({ id }: { id: string }) {
  const [answer, setAnswer] = useState<Answer>();

  const fetchAnswer = async () => {
    const { data } = await http.get(`/answers/${id}`);

    setAnswer(data);
  };

  useEffect(() => {
    fetchAnswer().then(() => {});
  }, []);

  return (
    <div className="AnswerComponent mb-5">
      <p>
        Posted by <Link to={`/users/profile/${answer?.user.email}`}>{answer?.user.name}</Link> At{" "}
        {dayjs(answer?.createdAt).format("YYYY/MM/DD HH:mm")}
      </p>
      <p>Last updated at {dayjs(answer?.updatedAt).format("YYYY/MM/DD HH:mm")}</p>
      <p>{answer?.text}</p>
    </div>
  );
}

export default AnswerComponent;
