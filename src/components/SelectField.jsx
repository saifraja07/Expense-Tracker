export const SelectField = ({
  label,
  id,
  name,
  value,
  onChange,
  defaultOption,
  options,
  error,
}) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        {defaultOption && (
          <option value="" disabled hidden>
            {defaultOption}
          </option>
        )}
        {options.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
      <p className="error">{error}</p>
    </div>
  );
};
