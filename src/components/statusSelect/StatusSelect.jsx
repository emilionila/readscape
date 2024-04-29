import React from 'react';
import './StatusSelect.scss';

const StatusSelect = ({ value, onChange }) => {
  return (
    <div className="status-select-container">
      <div className="status-select-field">
        <label>Reading Status</label>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="reading">Reading</option>
          <option value="plan to read">Plan to Read</option>
          <option value="finished">Finished</option>
        </select>
      </div>
    </div>
  );
};

export default StatusSelect;