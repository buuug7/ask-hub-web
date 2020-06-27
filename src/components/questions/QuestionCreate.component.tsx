import React, { useState } from "react";
import { http } from "../../http";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { ShowdownConverter } from "../../util";

function QuestionCreateComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("some description");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  return (
    <div className="QuestionCreateComponent">
      <h4>Create new question</h4>
      <div>
        <form>
          <div className="formGroup mb-2">
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              placeholder="please input question title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="formGroup">
            <ReactMde
              value={description}
              onChange={setDescription}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(ShowdownConverter.makeHtml(markdown))
              }
            />
          </div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await http.post("/questions", {
                title: title,
                description: description,
                tags: [],
              });
            }}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuestionCreateComponent;
