import React, { useEffect, useState } from "react";
import { Tag } from "../app.types";
import { http } from "../http";
import styles from "./Tags.module.scss";

function Tags() {
  const [tags, setTags] = useState<Tag[]>();

  const getTags = async () => {
    const { data } = await http.get("/tags");
    setTags(data);
  };

  useEffect(() => {
    getTags().then(() => {});
  }, []);

  return (
    <div className={styles.Tags}>
      <div className="HeadLine">
        <div className="title">分类</div>
      </div>

      <div className="tags">
        {tags?.map((item) => (
          <span className="item" key={item.id}>
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Tags;
