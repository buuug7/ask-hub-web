import React, { useState } from "react";
import { http } from "../http";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../app.state";
import "./LoginPage.scss";
import { ReactComponent as GithubIcon } from "bootstrap-icons/icons/github.svg";

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
      <div className="login-wrap">
        <h4>登录 Askhub</h4>
        <form className="mt-4">
          <div className="mb-3">
            <label htmlFor="email" className="formLabel">
              邮箱
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
              密码
            </label>

            <input
              className="formControl"
              type="text"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <a href="#" className="tips">
              忘记密码？
            </a>
          </div>

          <div>
            <button
              className="btn primary"
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                await login();
                await getUserInfo();
              }}
            >
              登录
            </button>

            <button className="btn ml-2">注册</button>
          </div>
        </form>

        <hr/>
        <div className="mt-4">
          <p>通过社交账号登录</p>
          <div>
            <button className="btn mr-2">
              <GithubIcon style={{ fontSize: "2rem" }} />
            </button>
            <button className="btn">微信</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
