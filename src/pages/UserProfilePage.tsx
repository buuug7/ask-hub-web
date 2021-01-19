import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { User } from "../app.types";
import { http } from "../http";
import "./UserProfilePage.scss";
import Skeleton from "../components/Skeleton";

export default function UserProfilePage() {
  // @ts-ignore
  const { email } = useParams();
  const [profile, setProfile] = useState<User>();

  const getUserProfile = useCallback(async () => {
    const { data } = await http.get(`/users/profile/${email}`);
    setProfile(data);
  }, [email]);

  useEffect(() => {
    getUserProfile().then(() => {});
  }, [getUserProfile]);

  if (!profile) {
    return <Skeleton />;
  }

  return (
    <div className="UserProfilePage">
      <div>用户名: {profile.name}</div>
      <div>邮箱: {profile.email}</div>
      <div>创建时间: {profile.createdAt}</div>
    </div>
  );
}
