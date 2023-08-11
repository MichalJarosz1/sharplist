"use client"

import { AddProductBarProps } from '@/types';
import { useState } from 'react';

export default function SearchBar({ onAdd, styles }: AddProductBarProps) {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [unit, setUnit] = useState('');
  const [tags, setTags] = useState('');

  
  function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') 
    {
        if (onAdd(name, number, unit, tags))
        {
            setName("");
            setNumber("");
            setUnit("");
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
      placeholder="Product name"
      className="w-1/4 p-1 rounded-sm bg-sky-200 placeholder:md:text-base placeholder:text-xs"
      />
    <input
      type="text"
      value={number}
      onChange={ (e) => setNumber(e.target.value)}
      onKeyDown={handleEnterKey}
      placeholder="Product number"
      className="w-1/4 p-1 rounded-sm bg-cyan-200 placeholder:md:text-base placeholder:text-xs"
    />
    <input
      type="text"
      value={unit}
      onChange={ (e) => setUnit(e.target.value)}
      onKeyDown={handleEnterKey}
      placeholder="Product unit"
      className="w-1/4 p-1 rounded-sm bg-teal-200 placeholder:md:text-base placeholder:text-xs"
    />
    <input
      type="text"
      value={tags}
      onChange={ (e) => setTags(e.target.value)}
      onKeyDown={handleEnterKey}
      placeholder="Product tags"
      className="w-1/4 p-1 rounded-sm bg-emerald-200 placeholder:md:text-base placeholder:text-xs"
    />
    </div>
  );
}