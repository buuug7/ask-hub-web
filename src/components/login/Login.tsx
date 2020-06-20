import React, { useContext, useState } from "react";
import http from "../../http";
import { AppContext } from "../../App";

function Login() {
  const context = useContext(AppContext);
  const [email, setEmail] = useState<string>("ask@dev.com");
  const [password, setPassword] = useState("123456");

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
    context.updateUser(data);
    console.log("userInfo", data);
  };

  return (
    <div className="Login">
      <h4>Login to ask hub</h4>
      <form>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            id="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="password">password</label>
          <input
            type="text"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
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

export default Login;
