import { ReactComponent as SearchIcon } from "../../../node_modules/bootstrap-icons/icons/search.svg";
import "./SearchBox.scss";

export default function SearchBox() {
  return (
    <div className="SearchBox mb-4">
      <div className="InputGroup box-shadow1">
        <input className="FormControl" type="text" placeholder="Search Askhub" />
        <button className="Button ButtonPrimary">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}
