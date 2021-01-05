import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { User } from "../app.interface";
import { http } from "../http";
import dayjs from "dayjs";
import "./UserProfilePage.scss";
import { useRecoilValue } from "recoil";
import { userState } from "../app.state";
import SkeletonComponent from "../components/SkeletonComponent";
import SnackbarSubject from "../snackbar-subject";

// TODO: update user profile
export default function UserProfilePage() {
  // @ts-ignore
  const { email } = useParams();
  const [profile, setProfile] = useState<User>();
  const [isMe, setIsMe] = useState(false);
  const me = useRecoilValue(userState);

  const getUserProfile = useCallback(async () => {
    const { data } = await http.get(`/users/profile/${email}`);
    setProfile(data);

    if (me && data) {
      setIsMe(data.email === me.email);
    }
  }, [email]);

  useEffect(() => {
    getUserProfile().then(() => {});
  }, [getUserProfile]);

  if (!profile) {
    return <SkeletonComponent />;
  }

  return (
    <div className="UserProfilePage">
      <form>
        <div className="formGroup">
          <label className="formLabel">用户名</label>
          <input className="formControl" value={profile.name} />
        </div>

        <div className="formGroup">
          <label className="formLabel">邮箱</label>
          <input className="formControl" disabled={true} value={profile.email} />
        </div>

        <div className="formGroup">
          <label className="formLabel">CreatedAt</label>
          <input
            className="formControl"
            disabled={true}
            value={dayjs(profile.createdAt).format("YYYY/MM/DD")}
          />
        </div>

        {isMe && (
          <div className="formGroup">
            <button
              className="btn primary"
              onClick={(e) => {
                e.preventDefault();
                SnackbarSubject.next("TODO");
              }}
            >
              保存
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
