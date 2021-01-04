import { useEffect, useState } from "react";
import { http } from "../http";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { ShowdownConverter } from "../util";
import { Tag } from "../app.interface";
import Select from "react-select";
import SnackSubject from "../snackbar-subject";

import "./QuestionCreateComponent.scss";

function QuestionCreateComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("问题的描述，可选");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState(null);

  useEffect(() => {
    async function getTags() {
      const { data } = await http.get("/tags");
      return data;
    }

    getTags().then((tags) => {
      console.log("tags", tags);
      setTags(tags);
    });
  }, []);

  console.log("selecteTags", selectedTags);

  return (
    <div className="QuestionCreateComponent">
      <h4>创建一个问题</h4>
      <div>
        <form>
          <div className="formGroup mb-2">
            <input
              className="formControl"
              type="text"
              id="title"
              name="title"
              value={title}
              placeholder="请填写问题的简要标题"
              autoComplete="off"
              style={{ width: "100%" }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="formGroup mb-2">
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

          <div className="formGroup mb-2">
            <Select
              placeholder="请添加标签，可选"
              value={selectedTags}
              // @ts-ignore
              onChange={setSelectedTags}
              options={tags}
              // @ts-ignore
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.slug}
              isMulti={true}
            />
          </div>

          <button
            className="btn primary"
            onClick={async (e) => {
              e.preventDefault();

              if (!title) {
                SnackSubject.next("请填写标题");
                return;
              }

              let tags = selectedTags
                ? // @ts-ignore
                  selectedTags.map((item) => {
                    return {
                      id: item.id,
                    };
                  })
                : [];

              await http.post("/questions", {
                title: title,
                description: description,
                tags: tags,
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
