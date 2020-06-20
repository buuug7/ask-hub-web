import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";
import { User } from "../../app.interface";

function UserProfileComponent() {
  const { email } = useParams();
  const [profile, setProfile] = useState<User>();

  const getUserProfile = async () => {
    const { data } = await http.get(`/users/profile/${email}`);

    setProfile(data);
  };

  useEffect(() => {
    getUserProfile().then(() => {});
  }, []);

  return (
    <div className="UserProfile">
      <dl>
        <dt>Name:</dt>
        <dd>{profile?.name}</dd>
        <dt>Email:</dt>
        <dd>{profile?.email}</dd>
        <dt>CreatedAt:</dt>
        <dd>{profile?.createdAt}</dd>
      </dl>
    </div>
  );
}

export default UserProfileComponent;
