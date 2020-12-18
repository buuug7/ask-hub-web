import "./Home.scss";
import { ReactComponent as SearchIcon } from "../../../node_modules/bootstrap-icons/icons/search.svg";

function Home() {
  return (
    <div className="HomePage mt-4">
      <h2 className="HomePageTitle">Askhub 一个实用的问答网站</h2>
      <div className="HomePageSearchBox mb-4">
        <div className="InputGroup box-shadow1">
          <input className="FormControl" type="text" placeholder="Search Askhub" />
          <button className="Button ButtonPrimary">
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="HeadLine">
        <div className="title">热门</div>
        <a className="more" href="#">更多</a>
      </div>
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
      <h2>按照分类</h2>
    </div>
  );
}

export default Home;
