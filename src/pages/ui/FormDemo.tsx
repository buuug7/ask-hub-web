export default function FormDemo() {
  return (
    <div>
      <p>
        <input type="text" className="formControl" placeholder="some placeholder" />
      </p>
      <p>
        <input type="text" className="formControl" disabled placeholder="some placeholder" />
      </p>
      <p>
        <input type="file" className="formControl" placeholder="some placeholder" />
      </p>

      <br />
    </div>
  );
}
