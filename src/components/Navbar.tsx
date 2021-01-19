import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../app.state";
import { ReactComponent as BellFillIcon } from "bootstrap-icons/icons/bell.svg";
import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";
import "./Navbar.scss";

function Navbar() {
  const history = useHistory();
  const location = useLocation();
  const user = useRecoilValue(userState);
  const { pathname } = location;
  const collapseRef = useRef(null);

  return (
    <div className="Navbar dark">
      <div className="container">
        <a href="/" className="brand">
          Askhub
        </a>
        <button
          className="toggleBtn"
          onClick={() => {
            const dom = collapseRef.current;

            if (dom) {
              const displayNone = window.getComputedStyle(dom).display === "none";
              // @ts-ignore
              dom.style.display = displayNone ? "block" : "none";
            }
          }}
        >
          <span className="toggleIcon" />
        </button>
        <div className="collapse" ref={collapseRef}>
          <div className="search">
            <SearchIcon className="icon" />
            <input className="formControl" type="text" placeholder="Search Askhub" />
          </div>
          <ul className="nav">
            <li
              className={pathname === "/questions" ? "navItem active" : "navItem"}
              onClick={() => {
                history.push("/questions");
              }}
            >
              发现
            </li>
            <li
              className={pathname === "/questions/create" ? "navItem active" : "navItem"}
              onClick={() => {
                history.push("/questions/create");
              }}
            >
              提问
            </li>
            <li
              className={pathname === "/ui" ? "navItem active" : "navItem"}
              onClick={() => {
                history.push("/ui");
              }}
            >
              UI
            </li>
          </ul>

          <div className="more">
            {!user && (
              <button
                className="btn primary"
                onClick={() => {
                  history.push("/login");
                }}
              >
                登录
              </button>
            )}

            {user && (
              <>
                <a href="#!" className="notifications">
                  <BellFillIcon />
                </a>
                <a href="/my-related">{`${user?.name}(${user?.email})`}</a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
