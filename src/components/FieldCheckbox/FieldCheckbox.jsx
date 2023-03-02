import { string, func, bool } from 'prop-types';
import cn from 'classnames';
import './FieldCheckbox.scss';

// == Composant
function FieldCheckbox({
  label,
  name,
  value,
  onChange,
}) {
  const inputId = `field-${name}`;

  function handleChange(event) {
    onChange(event.target.checked, name);
  }

  return (
    <div className={cn('field-checkbox', { 'field-checkbox--has-content': value.length > 0 })}>
      <input
        value={value}
        id={inputId}
        type="checkbox"
        className="field-checkbox__input"
        name={name}
        onChange={handleChange}
      />

      <label
        htmlFor={inputId}
        className="field-checkbox__label"
      >
        {label}
      </label>
    </div>
  );
}

FieldCheckbox.propTypes = {
  label: string.isRequired,
  value: bool,
  name: string.isRequired,
  onChange: func.isRequired,
};

FieldCheckbox.defaultProps = {
  value: false,
};

export default FieldCheckbox;
