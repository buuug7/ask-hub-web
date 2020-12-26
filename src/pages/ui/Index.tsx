import ButtonDemo from "./ButtonDemo";
import FormDemo from "./FormDemo";
import SearchBox from "../../components/SearchBox";

function Index() {
  return (
    <div className="playground mt-3">
      <h2>Search box</h2>
      <SearchBox />
      <h2>Button</h2>
      <ButtonDemo />

      <h2>form control - input</h2>
      <FormDemo />
    </div>
  );
}


export default Index;
