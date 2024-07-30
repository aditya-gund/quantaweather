import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('Amravati');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setError(''); // Clear error on input change
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setError('Please enter a tehsil name.'); // Validate input
      return;
    }
    onSearch(searchTerm);
    setSearchTerm(''); // Clear input after search
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Allow search with Enter key
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a tehsil..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className={`search-input ${error ? 'error' : ''}`} // Add error class if error exists
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
    </div>
  );
};

export default SearchBar;
