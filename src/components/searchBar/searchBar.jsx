import React from 'react';
import './searchBar.scss';
import { SearchIcon } from '../../assets/icons'; 

const SearchBar = () => {
  return (
    <div className="searchBar">
      <div className="searchBar__inputContainer">
        <div className="searchBar__icon">
          <SearchIcon width="20px" height="20px" />
        </div>
        <input type="text" className="searchBar__input" placeholder="Search for a book..." />
      </div>
    </div>
  );
};

export default SearchBar;
