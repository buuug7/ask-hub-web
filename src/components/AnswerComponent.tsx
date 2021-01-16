import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Answer } from "../app.types";
import { http } from "../http";
import { useRecoilValue } from "recoil";
import { userState } from "../app.state";
import { ShowdownConverter } from "../util";
import AnswerCreateOrUpdateComponent from "./AnswerCreateOrUpdateComponent";
import SkeletonComponent from "./SkeletonComponent";
import HighLight from "./HighLight";
import "./AnswerComponent.scss";

function AnswerComponent({ id }: { id: string }) {
  const user = useRecoilValue(userState);
  const [answer, setAnswer] = useState<Answer>();

  const [canUpdate, setCanUpdate] = useState(false);
  const [showUpdateView, setShowUpdateView] = useState(false);
  const [answerUpdated, setAnswerUpdated] = useState(0);

  const [starCount, setStarCount] = useState(0);
  const [isStarByRequestUser, setIsStarByRequestUser] = useState(false);

  // getAnswer
  const getAnswer = useCallback(async () => {
    const { data } = await http.get(`/answers/${id}`);
    setAnswer(data);
  }, [id, answerUpdated]); /* eslint react-hooks/exhaustive-deps: off */

  useEffect(() => {
    getAnswer().then(() => {});
  }, [getAnswer]);
  // getAnswer end

  // getAnswerStarCount
  const getAnswerStarCount = useCallback(async () => {
    const { data } = await http.get(`/answers/${id}/starCount`);
    setStarCount(data);
  }, [id]);

  useEffect(() => {
    getAnswerStarCount().then(() => {});
  }, [getAnswerStarCount]);
  // getAnswerStarCount end

  // checkCanUpdate
  const checkCanUpdate = useCallback(async () => {
    if (!user) {
      return;
    }
    const { data } = await http.get(`/answers/${id}/canUpdate`);
    setCanUpdate(data);
  }, [id, user]);

  useEffect(() => {
    checkCanUpdate().then(() => {});
  }, [checkCanUpdate]);
  // checkCanUpdate end

  // checkIsStarByRequestUser
  const checkIsStarByRequestUser = useCallback(async () => {
    if (!user) {
      return;
    }
    const { data } = await http.get(`/answers/${id}/isStarByUser`);
    setIsStarByRequestUser(data);
  }, [id, starCount]);

  useEffect(() => {
    checkIsStarByRequestUser().then(() => {});
  }, [checkIsStarByRequestUser]);
  // checkIsStarByRequestUser end

  if (!answer) {
    return (
      <div className="mb-3">
        <SkeletonComponent />
      </div>
    );
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
        <div className="text">
          <HighLight content={ShowdownConverter.makeHtml(answer.text)} />
        </div>
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
            const { data } = await http.post(`/answers/${id}/toggleStar`);
            setStarCount(data);
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
