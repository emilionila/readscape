import React, {useState} from 'react';
import './searchBar.scss';
import { SearchIcon } from '../../assets/icons';

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };
  return (
    <div className="searchBar">
      <div className="searchBar__inputContainer">
        <div className="searchBar__divider"></div>
        <input
            type="text"
            className="searchBar__input"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
        />
        <div className="searchBar__icon">
          <SearchIcon width="20px" height="20px" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
