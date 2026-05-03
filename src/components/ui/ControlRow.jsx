export default function ControlRow({ label, children }) {
  return (
    <div className="control-row">
      <span className="control-label">{label}</span>
      {children}
    </div>
  );
}
