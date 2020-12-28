import { useCallback, useContext, useEffect, useState } from "react";
import { http } from "../http";
import { Pagination, Question } from "../app.interface";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { to } from "../util";

function QuestionsComponent() {
  const context = useContext(AppContext);
  const [pagination, setPagination] = useState<Pagination<Question>>({
    meta: { total: 0, totalPage: 0, perPage: 10, currentPage: 1 },
    data: [],
  });

  const getQuestions = useCallback(async () => {
    const query = new URLSearchParams();
    query.append("currentPage", pagination.meta.currentPage.toString());
    query.append("perPage", pagination.meta.perPage.toString());

    const [error, res] = await to(http.get("/questions?" + query.toString()));

    if (error) {
      console.log("Error:", error);
      return;
    }

    setPagination((prevState) => {
      return {
        meta: res?.data.meta,
        data: prevState.data.concat(res?.data.data),
      };
    });
  }, [pagination.meta.perPage, pagination.meta.currentPage]);

  useEffect(() => {
    context.updateLoading(true);
    getQuestions().then((r) => {
      context.updateLoading(false);
    });
  }, [getQuestions]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="Questions">
      <ul>
        {pagination.data.map((item) => (
          <li key={item.id}>
            <Link to={`/questions/view/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>

      <button
        onClick={async () => {
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

export default QuestionsComponent;
