"use client"

import { SearchBarProps } from '@/types';
import { useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchBar({ onSearch, styles, placeholder }: SearchBarProps) {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => 
  {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      className={styles + " flex-nowrap flex"}
      placeholder={placeholder || "Search"}
      onKeyDown={(e) =>
        {
          if (e.key === 'Escape') 
          {
            setSearchTerm('');
            onSearch('');
          }
        }}
    />
  );
}

