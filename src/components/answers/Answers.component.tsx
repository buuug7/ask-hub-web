import React, { useEffect, useState } from "react";
import { Answer, Pagination } from "../../app.interface";
import { http } from "../../http";
import AnswerComponent from "./Answer.component";

function AnswersComponent({ questionId }: { questionId: string }) {
  const [pagination, setPagination] = useState<Pagination<Answer>>({
    total: 0,
    totalPage: 0,
    per: 10,
    current: 1,
    data: [],
  });

  const getAnswers = async () => {
    const query = new URLSearchParams();
    query.append("current", pagination.current.toString());
    query.append("per", pagination.per.toString());

    const { data } = await http.get(`/questions/${questionId}/answers?${query.toString()}`);

    setPagination({
      ...data,
      data: pagination.data.concat(data.data),
    });
  };

  useEffect(() => {
    getAnswers().then(() => {});
  }, [pagination.current]);

  return (
    <div className="Answers">
      <div>
        {pagination.data.map((item) => (
          <AnswerComponent id={item.id} key={item.id} />
        ))}
      </div>
      <button
        onClick={async () => {
          if (pagination.current < pagination.totalPage) {
            setPagination((pre) => {
              return {
                ...pre,
                current: pre.current + 1,
              };
            });
          }
        }}
      >
        load more
      </button>
    </div>
  );
}

export default AnswersComponent;
