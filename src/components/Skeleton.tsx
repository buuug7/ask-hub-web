import "./Skeleton.scss";

export default function Skeleton({ type = "v1" }) {
  return (
    <div className="skeletonWrap">
      {[1, 2, 3, 4].map((item) => (
        <div className={`skeleton ${type}`} key={item} />
      ))}
    </div>
  );
}
