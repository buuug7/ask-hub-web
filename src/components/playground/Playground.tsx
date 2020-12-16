import Button from "../button/Button";

function Playground() {
  return (
    <div className="playground">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cupiditate, debitis eum
      nulla optio quam suscipit tempora temporibus tenetur voluptate. Accusamus atque beatae
      doloremque esse, impedit inventore laudantium quis temporibus.
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
