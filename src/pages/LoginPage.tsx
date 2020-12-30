import React, { useState } from "react";
import { http } from "../http";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../app.state";

function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState<string>("ask@dev.com");
  const [password, setPassword] = useState("123456");
  const setUser = useSetRecoilState(userState);

  const login = async () => {
    const { data } = await http.post("/auth/login", {
      email: email,
      password: password,
    });
    sessionStorage.setItem("token", data.token);
  };

  const getUserInfo = async () => {
    const { data } = await http.get(`/users/profile/${email}`);
    sessionStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    history.push("/");
  };

  return (
    <div className="LoginPage mt-4">
      <h2>Login to Askhub</h2>
      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="formLabel">
            Email
          </label>
          <input
            type="text"
            className="formControl"
            value={email}
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="formLabel">
            password
          </label>
          <input
            className="formControl"
            type="text"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn primary"
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            await login();
            await getUserInfo();
          }}
        >
          login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
