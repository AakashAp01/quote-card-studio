import './Toggle.css';

export default function Toggle({ id, checked, onChange }) {
  return (
    <label className="toggle" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle-slider" />
    </label>
  );
}
