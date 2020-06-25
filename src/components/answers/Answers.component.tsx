import React, { useCallback, useEffect, useState } from "react";
import { Answer, Pagination } from "../../app.interface";
import { http } from "../../http";
import AnswerComponent from "./Answer.component";

function AnswersComponent({ questionId }: { questionId: string }) {
  const [pagination, setPagination] = useState<Pagination<Answer>>({
    meta: { total: 0, totalPage: 0, perPage: 10, currentPage: 1 },
    data: [],
  });

  const getAnswers = useCallback(async () => {
    const query = new URLSearchParams();
    query.append("currentPage", pagination.meta.currentPage.toString());
    query.append("perPage", pagination.meta.perPage.toString());

    const { data } = await http.get(`/questions/${questionId}/answers?${query.toString()}`);
    setPagination((prevState) => {
      return {
        meta: data.meta,
        data: prevState.data.concat(data.data),
      };
    });
  }, [questionId, pagination.meta.currentPage, pagination.meta.perPage]);

  useEffect(() => {
    getAnswers().then(() => {});
  }, [getAnswers]);

  return (
    <div className="Answers">
      <div>
        {pagination.data.map((item) => (
          <AnswerComponent id={item.id} key={item.id} />
        ))}
      </div>
      <button
        onClick={() => {
          if (pagination.meta.currentPage < pagination.meta.totalPage) {
            setPagination((prevState) => {
              return {
                ...prevState,
                meta: {
                  ...prevState.meta,
                  currentPage: prevState.meta.currentPage + 1,
                },
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
