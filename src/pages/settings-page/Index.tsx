import "./Index.scss";
import { useState } from "react";
import MyProfile from "./MyProfile";
import Logout from "./Logout";

const _menu = [
  { name: "个人资料", key: "profile" },
  { name: "账号设定", key: "账号设定" },
  { name: "邮箱设定", key: "邮箱设定" },
  { name: "退出登录", key: "logout" },
];

export default function SettingsIndex() {
  const [selectedMenu, setSelectedMenu] = useState(_menu[0]);

  return (
    <div className="SettingsIndex mt-4">
      <ul className="menu mb-3">
        {_menu.map((item) => (
          <li
            className={item.key === selectedMenu.key ? "selected" : ""}
            key={item.key}
            onClick={() => {
              setSelectedMenu(item);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div>
        {selectedMenu.key === "profile" && <MyProfile />}
        {selectedMenu.key === "logout" && <Logout />}
      </div>
    </div>
  );
}
