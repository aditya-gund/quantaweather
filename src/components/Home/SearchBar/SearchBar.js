import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="search-bar-container">
      <input 
        type="text" 
        placeholder="Search for a tehsil..." 
        className="search-bar" 
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
