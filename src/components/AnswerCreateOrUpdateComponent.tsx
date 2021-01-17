import ReactMdeWrap from "./ReactMdeWrap";
import { http } from "../http";
import SnackbarSubject from "../snackbar-subject";
import { useRecoilValue } from "recoil";
import { userState } from "../app.state";
import { useEffect, useState } from "react";
import { Answer } from "../app.types";
import { to } from "../util";

type AnswerCreateComponentProps = {
  createOrUpdate: "create" | "update";
  questionId: string;
  answer?: Partial<Answer>;
  callback: Function;
};

export default function AnswerCreateOrUpdateComponent({
  createOrUpdate,
  questionId,
  answer,
  callback,
}: AnswerCreateComponentProps) {
  const user = useRecoilValue(userState);
  const [answerText, setAnswerText] = useState("");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  useEffect(() => {
    if (answer) {
      setAnswerText(answer.text as string);
    }
  }, [answer]);

  const create = async () => {
    const data = {
      text: answerText,
      question: {
        id: questionId,
      },
    };

    const [error, res] = await to(http.post("/answers", data));

    if (error) {
      const errorMessage = error.response?.data.message;
      SnackbarSubject.next(errorMessage);
      return;
    }

    SnackbarSubject.next("成功提交");
    callback(res?.data);
  };

  const update = async () => {
    const data = {
      text: answerText,
    };
    await http.put(`/answers/${answer?.id}`, data);
    SnackbarSubject.next("更新成功");
    callback();
  };

  return (
    <div className="create-answer mt-2">
      <div className="mb-2">
        <a href="#!">{user?.email}</a>
      </div>
      <ReactMdeWrap
        value={answerText}
        onChange={setAnswerText}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <div className="mt-2">
        <button
          className="btn primary"
          onClick={async () => {
            switch (createOrUpdate) {
              case "create":
                await create();
                break;
              case "update":
                await update();
                break;
            }
          }}
        >
          提交
        </button>
      </div>
    </div>
  );
}
