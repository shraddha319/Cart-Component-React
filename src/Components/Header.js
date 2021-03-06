export default function Header({ brandName, brandIcon }) {
  return (
    <h1 className="app--title">
      {brandName}
      <img className="hero--icon" alt="" src={brandIcon} />
    </h1>
  );
}
