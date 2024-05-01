import React, { useState } from 'react';
import { TextField, IconButton, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

// Interface for props
interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void; // Define a new prop for clearing search
  
}

// SearchBar component
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState('');

  // Handler for input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Handler for form submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  // Handler for clear button click
  const handleClearClick = () => {
    setQuery(''); // Clear the query
    onClear(); // Call the clear function passed from the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center max-w-md mx-auto">
      <TextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        className="mr-2"
      />
      <IconButton type="submit" aria-label="search">
        <Search />
      </IconButton>
      <Button variant="contained" color="primary" onClick={handleClearClick}>
        Clear
      </Button>
    </form>
  );
};

export default SearchBar;
