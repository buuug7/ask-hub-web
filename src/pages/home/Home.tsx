import "./Home.scss";
import { ReactComponent as SearchIcon } from "../../../node_modules/bootstrap-icons/icons/search.svg";

function Home() {
  return (
    <div className="Home mt-4">
      <h2 className="title">Askhub 一个简单实用的问答网站</h2>
      <div className="search-box mb-4 box-shadow1">
        <div className="input-group">
          <input className="form-control" type="text" placeholder="Search Askhub" />
          <button className="btn primary">
            <SearchIcon />
          </button>
        </div>
      </div>

      <h2>趋势</h2>
      <div className="display-flex">
        {[1, 2, 3, 4].map((item) => (
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
        ))}
      </div>
      <h2>最新</h2>
      <div className="display-flex">
        {[1, 2, 3, 4].map((item) => (
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
        ))}
      </div>
    </div>
  );
}

export default Home;
