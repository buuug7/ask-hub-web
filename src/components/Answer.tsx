import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Answer as AnswerType } from "../app.types";
import { http } from "../http";
import { useRecoilValue } from "recoil";
import { userState } from "../app.state";
import { ShowdownConverter } from "../util";
import AnswerCreateUpdate from "./AnswerCreateUpdate";
import Skeleton from "./Skeleton";
import HighLight from "./HighLight";
import "./Answer.scss";

type AnswerProps = {
  id: string;
  callback?: Function;
};

function Answer({ id }: AnswerProps) {
  const user = useRecoilValue(userState);
  const [answer, setAnswer] = useState<AnswerType>();

  const [canUpdate, setCanUpdate] = useState(false);
  const [showUpdateView, setShowUpdateView] = useState(false);
  const [answerUpdated, setAnswerUpdated] = useState(0);

  const [starCount, setStarCount] = useState(0);
  const [isStarByRequestUser, setIsStarByRequestUser] = useState(false);

  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    http.get(`/answers/${id}/canDelete`).then(({ data }) => {
      setCanDelete(data);
    });
  }, [id]);

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
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="Answer mb-4">
      <div className="meta">
        <a href={`/users/${answer?.user?.email}`} className="user">
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
          <AnswerCreateUpdate
            type="update"
            questionId={answer.questionId as string}
            answer={answer}
            callback={() => {
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

        {canDelete && (
          <button
            className="btn ml-2"
            onClick={() => {
              // TODO
            }}
          >
            删除
          </button>
        )}
      </div>
    </div>
  );
}

export default Answer;
