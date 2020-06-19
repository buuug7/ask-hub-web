import React from "react";

function Logout() {
  return (
    <div className="logout">
      <h4>Did you really logout?</h4>

      <button
        onClick={() => {
          sessionStorage.clear();
          window.location.reload();
        }}
      >
        Yes
      </button>
    </div>
  );
}

export default Logout;
