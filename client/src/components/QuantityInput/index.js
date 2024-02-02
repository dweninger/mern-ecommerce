import React, { useEffect, useState } from 'react';
import './style.css';

/**
 * @author
 * @function QuantityInput
 */

const QuantityInput = ({ quantity, onChange }) => {
  const [value, setValue] = useState(quantity);

  const handleInputChange = e => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = Math.max(1, value - 1);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="quantity-input input-group">
      <button className="btn btn-secondary" onClick={handleDecrement}>
        -
      </button>
      <input
        type="number"
        className="form-control text-center"
        value={value}
        onChange={handleInputChange}
        readOnly={true}
      />
      <button className="btn btn-secondary" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default QuantityInput;
