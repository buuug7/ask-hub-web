import { useHistory, useLocation } from "react-router-dom";
import "./NavbarComponent.scss";
import { useRecoilValue } from "recoil";
import { userState } from "../app.state";
import { ReactComponent as BellFillIcon } from "bootstrap-icons/icons/bell.svg";
import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";

function NavbarComponent() {
  const history = useHistory();
  const location = useLocation();
  const user = useRecoilValue(userState);
  const { pathname } = location;

  return (
    <div className="navbar dark">
      <div className="container">
        <a href="/" className="brand">
          Askhub
        </a>
        <button
          className="toggleBtn"
          onClick={() => {
            const collapseDom = document.querySelector(".navbar .collapse");
            if (collapseDom) {
              const displayNone = window.getComputedStyle(collapseDom).display === "none";

              if (displayNone) {
                // @ts-ignore
                collapseDom.style.display = "block";
              } else {
                // @ts-ignore
                collapseDom.style.display = "none";
              }
            }
          }}
        >
          <span className="toggleIcon" />
        </button>
        <div className="collapse">
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
                <a
                  href="#!"
                  onClick={() => {
                    history.push("/my-related");
                  }}
                >
                  {`${user?.name}(${user?.email})`}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarComponent;
