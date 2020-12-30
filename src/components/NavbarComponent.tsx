import { useHistory, useLocation } from "react-router-dom";
import "./NavbarComponent.scss";
import { useRecoilValue } from "recoil";
import { userState } from "../app.state";

function NavbarComponent() {
  const history = useHistory();
  const location = useLocation();
  const user = useRecoilValue(userState);
  const { pathname } = location;

  return (
    <div className="Navbar dark">
      <div className="container">
        <a href="/" className="NavbarBrand">
          Askhub
        </a>
        <button
          className="NavbarToggleBtn"
          onClick={() => {
            const collapseDom = document.querySelector(".Navbar .NavBarCollapse");
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
          <span className="NavBarToggleIcon" />
        </button>
        <div className="NavBarCollapse">
          <div className="NavBarSearch">
            <input className="formControl" type="text" placeholder="Search Askhub" />
          </div>
          <ul className="NavbarNav">
            <li
              className={pathname === "/questions" ? "NavbarNavItem active" : "NavbarNavItem"}
              onClick={() => {
                history.push("/questions");
              }}
            >
              发现
            </li>
            <li
              className={
                pathname === "/questions/create" ? "NavbarNavItem active" : "NavbarNavItem"
              }
              onClick={() => {
                history.push("/questions/create");
              }}
            >
              提问
            </li>
            <li
              className={pathname === "/ui" ? "NavbarNavItem active" : "NavbarNavItem"}
              onClick={() => {
                history.push("/ui");
              }}
            >
              UI
            </li>
          </ul>
          {!user && (
            <button
              className="btn primary"
              onClick={() => {
                history.push("/login");
              }}
            >
              login
            </button>
          )}

          {user && (
            <div className="NavbarUser">
              <a
                href="#"
                onClick={() => {
                  history.push("/logout");
                }}
              >
                {`${user?.name}(${user?.email})`}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarComponent;
