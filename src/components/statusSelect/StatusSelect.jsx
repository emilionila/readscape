import React from 'react';
import './StatusSelect.scss';

const StatusSelect = ({ value, onChange }) => {
  return (
    <div className="status-select-container">
      <div className="status-select-field">
        <label>Reading Status</label>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="Reading">Reading</option>
          <option value="Going to read">Going to Read</option>
          <option value="Finished">Finished</option>
        </select>
      </div>
    </div>
  );
};

export default StatusSelect;