import React, { useCallback, useEffect, useState } from "react";
import { Answer } from "../app.types";
import { http } from "../http";
import AnswerComponent from "./AnswerComponent";

function AnswersComponent({ questionId }: { questionId: string }) {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const getAnswers = useCallback(async () => {
    const { data } = await http.get(`/questions/${questionId}/answers`);
    setAnswers(data);
  }, [questionId]);

  useEffect(() => {
    getAnswers().then(() => {});
  }, [getAnswers]);

  return (
    <div className="Answers">
      <div>
        {answers.map((item, index) => (
          <>
            <AnswerComponent id={item.id} key={item.id} />
            {index !== answers.length - 1 && <hr />}
          </>
        ))}
      </div>
    </div>
  );
}

export default AnswersComponent;
