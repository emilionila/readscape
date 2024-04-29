import React from 'react';
import './TextInput.scss';

const TextInput = ({ label, value, onChange }) => {
  return (
    <div className="text-area-input-container">
      <div className="text-area-input-field">
        <label>{label}</label>
        <textarea value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
};

export default TextInput;