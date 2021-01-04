import QuestionCreateComponent from "../components/QuestionCreateComponent";
import "./QuestionCreatePage.scss";

function QuestionCreatePage() {
  return (
    <div className="QuestionCreatePage pt-4">
      <QuestionCreateComponent />

      <div>
        <h4>如何提出一个好问题？</h4>
        <p>
          首先登录网站，您可以随时提出一个问题，社区可以为您提供帮助！为了给您最好的答案，我们提供了一些指导。
        </p>
        <p>在发布之前，请搜索网站以确保您的问题没有被提出过。</p>
        <ul>
          <li>概括你的问题，标题尽可能具体简洁</li>
          <li>问题描述中尽可能多的提供与该问题关联的信息或者问题的详细描述</li>
          <li>如果与编程相关的问题，，提供一些代码在适当的时候会更加有用</li>
        </ul>
      </div>
    </div>
  );
}

export default QuestionCreatePage;
