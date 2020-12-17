
export default function FormDemo() {
  return (
    <div>
      <p>
        <input type="text" className="form-control" placeholder="some placeholder" />
      </p>
      <p>
        <input type="text" className="form-control" disabled placeholder="some placeholder" />
      </p>
      <p>
        <input type="file" className="form-control" placeholder="some placeholder" />
      </p>
    </div>
  );
}
