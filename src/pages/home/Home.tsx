import "./Home.scss";
import { ReactComponent as SearchIcon } from "../../../node_modules/bootstrap-icons/icons/search.svg";

function Home() {
  console.log(SearchIcon);
  return (
    <div className="Home mt-4">
      <div className="search-input-container">
        <input placeholder="search askhub questions" type="text" className="search-input" />
        <div className="search-btn">
          <SearchIcon />
        </div>
      </div>
      <h2>趋势</h2>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad culpa deserunt dignissimos
        exercitationem, labore magnam modi possimus ratione reprehenderit sequi. Accusantium aliquid
        dolorem error harum ipsa odio repellendus sapiente similique!
      </div>
      <h2>最新</h2>
    </div>
  );
}

export default Home;
