// SearchBar.tsx
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim();
    setSearchTerm(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-center items-center m-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar marca, modelo..."
        className="border border-red-600 p-2 rounded-md w-full max-w-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 transition"
      />
    </div>
  );
};

export default SearchBar;
