import dayjs from "dayjs";
import { http } from "../../http";
import SnackbarSubject from "../../snackbar-subject";
import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../app.state";
import SkeletonComponent from "../../components/SkeletonComponent";

export default function SettingsPage() {
  const user = useRecoilValue(userState);
  const [profile, setProfile] = useState(user);
  const setUserState = useSetRecoilState(userState);

  if (!profile) {
    return <SkeletonComponent />;
  }

  return (
    <div className="Profile">
      <h4>个人资料</h4>
      <form>
        <div className="formGroup">
          <label className="formLabel">用户名</label>
          <input
            className="formControl"
            value={profile.name}
            onChange={(e) => {
              // @ts-ignore
              setProfile((prevState) => {
                return {
                  ...prevState,
                  name: e.target.value,
                };
              });
            }}
          />
        </div>

        <div className="formGroup">
          <label className="formLabel">邮箱</label>
          <input className="formControl" disabled={true} value={profile.email} />
        </div>

        <div className="formGroup">
          <label className="formLabel">创建时间</label>
          <input
            className="formControl"
            disabled={true}
            value={dayjs(profile.createdAt).format("YYYY/MM/DD")}
          />
        </div>

        <div className="formGroup">
          <button
            className="btn primary"
            onClick={async (e) => {
              e.preventDefault();
              const { data } = await http.post(`/users/${user?.id}`, { name: profile.name });
              setUserState(data);
              localStorage.setItem("user", JSON.stringify(data));
              SnackbarSubject.next("更新成功");
            }}
          >
            更新个人资料
          </button>
        </div>
      </form>
    </div>
  );
}
