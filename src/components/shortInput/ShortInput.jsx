import React from 'react';
import './ShortInput.scss';

export const ShortInput = ({ label, type, value, onChange, placeholder }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="short-input-container">
      <div className="short-input-field">
        <label>{label}</label>
        <input
          type={type}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default ShortInput;