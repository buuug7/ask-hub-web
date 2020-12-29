import { http } from "../http";
import { useCallback, useEffect, useState } from "react";
import { to } from "../util";
import { Question } from "../app.interface";
import QuestionComponent from "../components/QuestionComponent";
import TagsComponent from "../components/TagsComponent";
import "./HomePage.scss";

function HomePage() {
  const [hotQuestions, setHotQuestions] = useState<Question[]>([]);

  const getHotQuestions = useCallback(async () => {
    const [error, res] = await to(http.get("/questions/analysis/getHotQuestions"));
    if (error) {
      console.log("Error: ", error);
      return;
    }
    setHotQuestions(res?.data);
  }, []);

  useEffect(() => {
    getHotQuestions().then(() => {
      console.log("fuck");
    });
  }, [getHotQuestions]);

  return (
    <div className="HomePage mt-4">
      <div className="HomePageLeft mb-4">
        <div className="title text-center">
          <h2 className="">热门问题</h2>
          <p className="">最近一个月回答数最多的前十个问题</p>
        </div>
        {hotQuestions.map((item) => (
          <div className="mb-2" key={item.id}>
            <QuestionComponent id={item.id} showActions={true} />
          </div>
        ))}
      </div>

      <div className="HomePageRight">
        <TagsComponent />
      </div>
    </div>
  );
}

export default HomePage;
