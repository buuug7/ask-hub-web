import React, { useEffect, useState } from "react";
import { Answer, Pagination } from "../../app.interface";
import http from "../../http";
import { Link } from "react-router-dom";
import AnswerComponent from "./Answer.component";

function AnswersComponent({ questionId }: { questionId: string }) {
  const [pagination, setPagination] = useState<Pagination<Answer>>({
    total: 0,
    totalPage: 0,
    per: 10,
    current: 1,
    data: [],
  });

  // faker
  questionId = "f8f6c7ec-38b0-4cec-90f1-2265a115ec9d";

  const fetchAnswers = async (pagination: Pagination<Answer>) => {
    const query = new URLSearchParams();
    query.append("current", pagination.current.toString());
    query.append("per", pagination.per.toString());

    const { data } = await http.get(`/questions/${questionId}/answers?${query.toString()}`);

    setPagination({
      ...data,
      data: pagination.data.concat(data.data),
    });

    console.log("data", data);
  };

  useEffect(() => {
    fetchAnswers(pagination).then(() => {});
  }, []);

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
            await fetchAnswers({
              ...pagination,
              current: pagination.current + 1,
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
