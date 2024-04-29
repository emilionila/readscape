import React from 'react';
import './TitleInput.scss';

const TitleInput = ({ value, onChange }) => {
  return (
    <div className="title-input-container">
      <div className="title-input-field">
        <label>Title</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TitleInput;