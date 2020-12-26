import { http } from "../http";
import { useCallback, useEffect, useState } from "react";
import { to } from "../util";
import { Question } from "../app.interface";

import "./HomePage.scss";

const question = {
  title: 'The purpose of the command',
  description: 'You probably have heard of behavioral patterns by now. Behavioral patterns are concerned about the interaction of objects.'
}

function HomePage() {
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
      <div className="HomePageLeft">
        {
          [1,2,3,4].map(item => <div>
            <div className="title">{question.title}</div>
            <div className="description">{question.description}</div>
          </div>)
        }
      </div>

    </div>
  );
}

export default HomePage;
