import { useHistory, useLocation } from "react-router-dom";
import "./Navbar.scss";
import Button from "../button/Button";

function Navbar() {
  const history = useHistory();
  const location = useLocation();
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
          <ul className="NavbarNav">
            <li
              className={pathname === "/questions" ? "NavbarNavItem active" : "NavbarNavItem"}
              onClick={() => {
                history.push("/questions");
              }}
            >
              questions
            </li>
            <li
              className={pathname === "/tags" ? "NavbarNavItem active" : "NavbarNavItem"}
              onClick={() => {
                history.push("/tags");
              }}
            >
              tags
            </li>
            <li
              className={
                pathname === "/questions/create" ? "NavbarNavItem active" : "NavbarNavItem"
              }
              onClick={() => {
                history.push("/questions/create");
              }}
            >
              create questions
            </li>
            <li
              className={pathname === "/playground" ? "NavbarNavItem active" : "NavbarNavItem"}
              onClick={() => {
                history.push("/playground");
              }}
            >
              playground
            </li>
          </ul>

          <Button
            onClick={() => {
              history.push("/login");
            }}
            text={"login"}
          />

          <Button
            onClick={() => {
              history.push("/logout");
            }}
            text={"logout"}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
