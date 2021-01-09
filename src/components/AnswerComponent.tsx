import React, { useCallback, useEffect, useState } from "react";
import { Answer } from "../app.types";
import { http } from "../http";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { userState } from "../app.state";
import { ShowdownConverter } from "../util";
import "./AnswerComponent.scss";

function AnswerComponent({ id }: { id: string }) {
  const history = useHistory();
  const user = useRecoilValue(userState);
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
    if (!user) {
      return;
    }

    const { data } = await http.get(`/answers/${id}/isStarByRequestUser`);
    setIsStarByRequestUser(data);
  }, [id, startToggleStar]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    checkIsStarByRequestUser().then(() => {});
  }, [checkIsStarByRequestUser]);

  if (!answer) {
    return <div>loading</div>;
  }

  return (
    <div className="AnswerComponent mb-4">
      <div className="meta">
        <a
          className="user"
          onClick={() => {
            history.push(`/users/profile/${answer?.user?.email}`);
          }}
        >
          {answer?.user?.name}
        </a>
        <div className="updatedAt">
          Last updated {dayjs(answer?.updatedAt).format("YYYY/MM/DD HH:mm")}
        </div>
      </div>
      <div
        className="text"
        dangerouslySetInnerHTML={{
          __html: ShowdownConverter.makeHtml(answer?.text),
        }}
      />
      <div>
        <button
          disabled={user === null}
          onClick={async () => {
            await http.post(`/answers/${id}/toggleStar`);
            setStartToggleStar(Math.random);
          }}
          className={isStarByRequestUser ? "btn primary" : "btn"}
        >
          {isStarByRequestUser ? "unStar" : "star"} ({starCount})
        </button>
      </div>
    </div>
  );
}

export default AnswerComponent;
