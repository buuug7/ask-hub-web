import { useEffect, useState } from "react";
import { http } from "../../http";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { ShowdownConverter } from "../../util";
import { Tag } from "../../app.interface";
import Button from "../button/Button";

function QuestionCreateComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("some description");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function getTags() {
      const { data } = await http.get("/tags");
      return data;
    }

    getTags().then((tags) => {
      console.log("tags", tags);
      setTags(tags[0]);
    });
  }, []);

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

          <div className="formGroup">
            <label htmlFor="">Tags</label>
            <div>
              {tags.map((item) => (
                <label key={item.id} className="mr-2">
                  {item.name}
                  <input
                    type="checkbox"
                    value={item.name}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (checked) {
                        setSelectedTags([...selectedTags, item]);
                      } else {
                        const _tags = selectedTags.filter((it) => it.id === item.id);
                        setSelectedTags(_tags);
                      }
                    }}
                  />
                </label>
              ))}
            </div>
          </div>
          <Button
            className="btn primary"
            onClick={async (e) => {
              e.preventDefault();
              await http.post("/questions", {
                title: title,
                description: description,
                tags: selectedTags,
              });
            }}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}

export default QuestionCreateComponent;
