import React, { useCallback, useContext, useEffect, useState } from "react";
import { Answer } from "../../app.interface";
import { http } from "../../http";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import "./Answer.scss";
import { AppContext } from "../../App";

function AnswerComponent({ id }: { id: string }) {
  const context = useContext(AppContext);
  const [answer, setAnswer] = useState<Answer>();
  const [starCount, setStarCount] = useState(0);
  const [isStarByRequestUser, setIsStarByRequestUser] = useState(false);

  const [startToggleStar, setStartToggleStar] = useState(Math.random);

  const getAnswer = useCallback(async () => {
    const { data } = await http.get(`/answers/${id}`);
    setAnswer(data);
  }, [id]);

  useEffect(() => {
    getAnswer().then(() => {});
  }, [getAnswer]);

  const getAnswerStarCount = useCallback(async () => {
    const { data } = await http.get(`/answers/${id}/starCount`);
    setStarCount(data);
  }, [id, startToggleStar]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getAnswerStarCount().then(() => {});
  }, [getAnswerStarCount]);

  const checkIsStarByRequestUser = useCallback(async () => {
    if (!context.user) {
      return;
    }

    const { data } = await http.get(`/answers/${id}/isStarByRequestUser`);
    setIsStarByRequestUser(data);
  }, [id, startToggleStar]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    checkIsStarByRequestUser().then(() => {});
  }, [checkIsStarByRequestUser]);

  return (
    <div className="AnswerComponent mb-5">
      <p>
        Posted by <Link to={`/users/profile/${answer?.user.email}`}>{answer?.user.name}</Link> At{" "}
        {dayjs(answer?.createdAt).format("YYYY/MM/DD HH:mm")}
      </p>
      <p>Last updated at {dayjs(answer?.updatedAt).format("YYYY/MM/DD HH:mm")}</p>
      <p>{answer?.text}</p>
      <div>
        <button
          disabled={context.user === null}
          onClick={async () => {
            await http.post(`/answers/${id}/toggleStar`);
            setStartToggleStar(Math.random);
          }}
          className={isStarByRequestUser ? "star" : ""}
        >
          {isStarByRequestUser ? "unStar" : "star"} ({starCount})
        </button>
      </div>
    </div>
  );
}

export default AnswerComponent;
