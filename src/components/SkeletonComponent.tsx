export default function SkeletonComponent({ type = "v1" }) {
  return (
    <div className="SkeletonComponent">
      {[1, 2, 3, 4, 5].map((item) => (
        <div className={`skeleton ${type}`} key={item} />
      ))}
    </div>
  );
}
