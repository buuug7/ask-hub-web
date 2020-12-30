import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";
import "./SearchBox.scss";

export default function SearchBox() {
  return (
    <div className="SearchBox mb-4">
      <div className="inputGroup box-shadow1">
        <input className="formControl" type="text" placeholder="Search Askhub" />
        <button className="btn primary">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}
