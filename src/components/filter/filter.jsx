import React, { useState, useEffect } from 'react';
import './filter.scss';
import { FilterIcon } from '../../assets/icons';

const Filter = ({ handleFilterChange }) => {
  const [isActive, setIsActive] = useState(false);
  const [filters, setFilters] = useState({
    finished: false,
    inProgress: false,
    goingToRead: false,
  });

  const toggleFilter = () => {
    setIsActive(!isActive);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked,
    }));
  };
  
  useEffect(() => {
    handleFilterChange(filters);
  }, [filters, handleFilterChange]);

  return (
    <div className="filter">
      <button className="filter__toggle" onClick={toggleFilter}>
        <FilterIcon width="20px" height="20px" />
        Filter
      </button>
      {isActive && (
        <div className="filter__panel">
          <label>
            <input
              type="checkbox"
              name="finished"
              checked={filters.finished}
              onChange={handleCheckboxChange}
            />
            Finished
          </label>
          <label>
            <input
              type="checkbox"
              name="inProgress"
              checked={filters.inProgress}
              onChange={handleCheckboxChange}
            />
            In Progress
          </label>
          <label>
            <input
              type="checkbox"
              name="goingToRead"
              checked={filters.goingToRead}
              onChange={handleCheckboxChange}
            />
            Going to Read
          </label>
        </div>
      )}
    </div>
  );
};

export default Filter;
