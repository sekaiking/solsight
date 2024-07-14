"use client";
import React, { useState } from "react";
import styles from "./search-input.module.css";

const SearchInput: React.FC<{
  onSearch: (query: string) => void;
  placeholder?: string;
  buttonText?: string;
}> = ({ onSearch, placeholder, buttonText }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={placeholder ?? ""}
      />
      <button type="submit" className={styles.searchButton}>
        {buttonText ?? ""}
      </button>
    </form>
  );
};

export default SearchInput;
