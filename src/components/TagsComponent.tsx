import React, { useEffect, useState } from "react";
import { Tag } from "../app.interface";
import { http } from "../http";

function TagsComponent() {
  const [tags, setTags] = useState<Tag[]>();

  const getTags = async () => {
    const { data } = await http.get("/tags");
    setTags(data);
  };

  useEffect(() => {
    getTags().then(() => {});
  }, []);

  return (
    <div className="TagsComponent">
      <h4>All tags</h4>
      <ul>
        {tags?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TagsComponent;
