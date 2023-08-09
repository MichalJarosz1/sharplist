"use client"

import { AddRecipeBarProps } from '@/types';
import { useState } from 'react';

export default function SearchBar({ onAdd, styles }: AddRecipeBarProps) {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [tags, setTags] = useState('');

  
  function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') 
    {
        if (onAdd(name, number, tags))
        {
            setName("");
            setNumber("");
            setTags("");
        }
    }
  }

  return (
    <div className={styles + "flex flex-row justify-between border-2 border-groove mb-1 rounded-md"} >
    <input
      type="text"
      value={name}
      onChange={ (e) => setName(e.target.value)}
      onKeyDown={handleEnterKey}
      placeholder="Recipe name"
      className="w-1/3 p-1 rounded-sm bg-sky-200"
      />
    <input
      type="text"
      value={number}
      onChange={ (e) => setNumber(e.target.value)}
      onKeyDown={handleEnterKey}
      placeholder="Recipe number"
      className="w-1/3 p-1 rounded-sm bg-cyan-200"
    />
    <input
      type="text"
      value={tags}
      onChange={ (e) => setTags(e.target.value)}
      onKeyDown={handleEnterKey}
      placeholder="Recipe tags"
      className="w-1/3 p-1 rounded-sm bg-emerald-200"
    />
    </div>
  );
}