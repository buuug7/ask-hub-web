import Button from "../button/Button";

function Playground() {
  return (
    <div className="playground mt-3">
      <h2>Button</h2>
      <p>
        <Button text={"default"} />
      </p>
      <p>
        <Button text={"default active"} status={["active"]} />
      </p>
      <p>
        <Button text={"default disabled"} status={["disabled"]} />
      </p>
      <p>
        <Button text={"Primary"} status={["btn-primary"]} />
      </p>
      <p>
        <Button text={"Primary active"} status={["btn-primary", "active"]} />
      </p>
      <p>
        <Button text={"Primary active"} status={["btn-primary", "disabled"]} />
      </p>
    </div>
  );
}

export default Playground;
