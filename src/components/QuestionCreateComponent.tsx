import { useEffect, useState } from "react";
import { http } from "../http";
import { Tag } from "../app.interface";
import Select from "react-select";
import SnackSubject from "../snackbar-subject";
import { useRecoilValue } from "recoil";
import { userState } from "../app.state";
import ReactMdeWrap from "./ReactMdeWrap";

import "./QuestionCreateComponent.scss";

function QuestionCreateComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState(null);
  const user = useRecoilValue(userState);

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
      <form>
        <div className="formGroup mb-3">
          <label className="formLabel">标题</label>
          <p className="tips">标题尽可能具体，想象成您要问另一个人一个问题</p>
          <input
            className="formControl"
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="例如：Java 泛型中的通配符 T，E，K，V 都代表什么意思？"
            autoComplete="off"
            style={{ width: "100%" }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="formGroup mb-3">
          <label className="formLabel">描述</label>
          <p className="tips">可选，尽可能提供回答您问题所需的各种信息</p>
          <ReactMdeWrap
            value={description}
            onChange={setDescription}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
        </div>

        <div className="formGroup mb-2">
          <label className="formLabel">标签</label>
          <p className="tips">可选，该问题所属的话题，最好不要超过5个标签</p>
          <Select
            placeholder="例如：Java"
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

            if (!user) {
              SnackSubject.next("请先登录！");
              return;
            }

            if (!title) {
              SnackSubject.next("请填写标题！");
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
          发布你的问题
        </button>
      </form>
    </div>
  );
}

export default QuestionCreateComponent;
