export default function FormDemo() {
  return (
    <div>
      <p>
        <input type="text" className="FormControl" placeholder="some placeholder" />
      </p>
      <p>
        <input type="text" className="FormControl" disabled placeholder="some placeholder" />
      </p>
      <p>
        <input type="file" className="FormControl" placeholder="some placeholder" />
      </p>

      <br />
    </div>
  );
}
