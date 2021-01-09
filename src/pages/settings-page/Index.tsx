import "./Index.scss";
import MyProfile from "./MyProfile";

export default function SettingsIndex() {
  return (
    <div className="SettingsIndex mt-4">
      <ul className="menu mb-3">
        <li>个人资料</li>
        <li>账号设定</li>
        <li>邮箱设定</li>
      </ul>
      <div>
        <MyProfile />
      </div>
    </div>
  );
}
