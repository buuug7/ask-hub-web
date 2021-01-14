import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Answer } from "../app.types";
import { http } from "../http";
import { useRecoilValue } from "recoil";
import { userState } from "../app.state";
import { ShowdownConverter } from "../util";
import AnswerCreateOrUpdateComponent from "./AnswerCreateOrUpdateComponent";
import SkeletonComponent from "./SkeletonComponent";
import "./AnswerComponent.scss";

function AnswerComponent({ id }: { id: string }) {
  const user = useRecoilValue(userState);
  const [answer, setAnswer] = useState<Answer>();
  const [starCount, setStarCount] = useState(0);
  const [isStarByRequestUser, setIsStarByRequestUser] = useState(false);
  const [startToggleStar, setStartToggleStar] = useState(Math.random);
  const [canUpdate, setCanUpdate] = useState(false);
  const [showUpdateView, setShowUpdateView] = useState(false);
  const [answerUpdated, setAnswerUpdated] = useState(0);

  const getAnswer = useCallback(async () => {
    const { data } = await http.get(`/answers/${id}`);
    setAnswer(data);
  }, [id, answerUpdated]); /* eslint react-hooks/exhaustive-deps: off */

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

  const checkCanUpdate = useCallback(async () => {
    if (!user) {
      return;
    }

    const { data } = await http.get(`/answers/${id}/canUpdate`);
    setCanUpdate(data);
  }, [id, user]);

  useEffect(() => {
    checkIsStarByRequestUser().then(() => {});
    checkCanUpdate().then(() => {});
  }, [checkIsStarByRequestUser, checkCanUpdate]);

  if (!answer) {
    return <SkeletonComponent />;
  }

  return (
    <div className="AnswerComponent mb-4">
      <div className="meta">
        <a href={`/users/profile/${answer?.user?.email}`} className="user">
          {answer?.user?.name}
        </a>
        <div className="updatedAt">
          Last updated {dayjs(answer?.updatedAt).format("YYYY/MM/DD HH:mm")}
        </div>
      </div>

      {!showUpdateView && (
        <div
          className="text"
          dangerouslySetInnerHTML={{
            __html: ShowdownConverter.makeHtml(answer?.text),
          }}
        />
      )}

      {showUpdateView && (
        <div className="mb-2">
          <AnswerCreateOrUpdateComponent
            createOrUpdate="update"
            questionId={answer.questionId as string}
            answer={answer}
            cb={() => {
              setShowUpdateView(false);
              setAnswerUpdated((prevState) => ++prevState);
            }}
          />
        </div>
      )}

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
        {canUpdate && (
          <button
            className={showUpdateView ? "btn primary ml-2" : "btn ml-2"}
            onClick={() => {
              setShowUpdateView((prevState) => !prevState);
            }}
          >
            {showUpdateView ? "关闭修改答案" : "修改答案"}
          </button>
        )}
      </div>
    </div>
  );
}

export default AnswerComponent;
