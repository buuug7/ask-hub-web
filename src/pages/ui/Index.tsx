import Button from "../../components/button/Button";

function Index() {
  return (
    <div className="playground mt-3">
      <h2>Button</h2>
      <p>
        <Button className="btn">default</Button>
      </p>
      <p>
        <Button className="btn active">default active</Button>
      </p>
      <p>
        <Button className="btn disabled">default disabled</Button>
      </p>
      <p>
        <Button className="btn primary">primary</Button>
      </p>
      <p>
        <Button className="btn primary active">primary active</Button>
      </p>
      <p>
        <Button className="btn primary disabled">primary disabled</Button>
      </p>
    </div>
  );
}

export default Index;
