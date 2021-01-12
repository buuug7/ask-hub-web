import React from "react";

function Logout() {
  return (
    <div className="logout">
      <h4>退出登录</h4>
      <p>确定要退出登录吗？</p>
      <button
        className="btn"
        onClick={() => {
          const yes = window.confirm("确定要退出登录吗？");

          if (!yes) {
            return;
          }

          localStorage.clear();
          window.location.href = "/";
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }}
      >
        登出
      </button>
    </div>
  );
}

export default Logout;
