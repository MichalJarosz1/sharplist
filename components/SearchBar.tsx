"use client"

import { SearchBarProps } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function SearchBar({ onSearch, styles, placeholder }: SearchBarProps) {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => 
  {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="h-10 mx-2 px-2 rounded-3xl flex w-full justify-between bg-stone-100 bg-opacity-20 hover:bg-opacity-100 focus:bg-opacity-100 ">
      <MagnifyingGlassIcon className="w-8 h-8 self-center cursor-text border-stone-100 text-slate-500"/>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className={`${styles} px-2 w-full bg-transparent`}
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
    </div>
  );
}

