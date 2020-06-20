import React, { useContext, useEffect, useState } from "react";
import http from "../../http";
import { Pagination, Question } from "../../app.interface";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";

function QuestionsComponent() {
  const context = useContext(AppContext);
  const [pagination, setPagination] = useState<Pagination<Question>>({
    total: 0,
    totalPage: 0,
    per: 10,
    current: 1,
    data: [],
  });

  const fetchQuestions = async (pagination: Pagination<Question>) => {
    const query = new URLSearchParams();
    query.append("current", pagination.current.toString());
    query.append("per", pagination.per.toString());

    context.updateLoading(true);
    const { data } = await http.get("/questions?" + query.toString());
    context.updateLoading(false);

    setPagination({
      ...data,
      data: pagination.data.concat(data.data),
    });
    console.log("=questions=", data);
  };

  useEffect(() => {
    fetchQuestions(pagination).then((r) => {});
  }, []);

  return (
    <div className="Questions">
      <ul>
        {pagination.data.map((item) => (
          <li key={item.id}>
            <Link to={`/questions/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>

      <button
        onClick={async () => {
          if (pagination.current < pagination.totalPage) {
            await fetchQuestions({
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

export default QuestionsComponent;
