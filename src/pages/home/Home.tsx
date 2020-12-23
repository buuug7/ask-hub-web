import { http } from "../../http";
import { useCallback, useEffect, useState } from "react";
import { to } from "../../util";
import { Question } from "../../app.interface";

import "./Home.scss";

function Home() {
  const [hotQuestions, setHotQuestions] = useState<Question[]>([]);

  const getHotQuestions = useCallback(async () => {
    const [error, res] = await to(http.get("/questions/analysis/getByMostAnswers"));
    if (error) {
      console.log("Error: ", error);
      return;
    }

    console.log("Res:", res);
    setHotQuestions(res?.data);
  }, []);

  useEffect(() => {
    getHotQuestions().then(() => {
      console.log("fuck");
    });
  }, [getHotQuestions]);

  return (
    <div className="HomePage mt-4">
      <h2 className="HomePageTitle">Askhub 一个实用的问答网站</h2>

      <div className="HeadLine">
        <div className="title">热门</div>
        <a className="more" href="#">
          更多
        </a>
      </div>
      <div className="display-flex">
        {hotQuestions.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
      <h2>最新</h2>
      <div className="display-flex">
        {[1, 2, 3, 4].map((item) => (
          <div key={item}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
        ))}
      </div>
      <h2>按照分类</h2>
    </div>
  );
}

export default Home;
