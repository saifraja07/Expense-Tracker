export const InputField = ({
  label,
  id,
  title,
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input id={title} name={name} value={value} onChange={onChange} />
      <p className="error">{error}</p>
    </div>
  );
};
