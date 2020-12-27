import React, { useContext, useState } from "react";
import { http } from "../http";
import { AppContext } from "../App";

function LoginPage() {
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
    <div className="LoginPage mt-4">
      <h2>Login to Askhub</h2>
      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="FormLabel">
            Email
          </label>
          <input
            type="text"
            className="FormControl"
            value={email}
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="FormLabel">
            password
          </label>
          <input
            className="FormControl"
            type="text"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="Button ButtonPrimary"
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
