export default function ButtonDemo() {
  return (
    <div>
      <p>
        <button className="Button">default</button>
      </p>
      <p>
        <button className="Button active">default active</button>
      </p>
      <p>
        <button className="Button disabled">default disabled</button>
      </p>
      <p>
        <button className="Button ButtonPrimary">primary</button>
      </p>
      <p>
        <button className="Button ButtonPrimary active">primary active</button>
      </p>
      <p>
        <button className="Button ButtonPrimary disabled">primary disabled</button>
      </p>
    </div>
  );
}
