"use client"

import { AddRecipeBarProps } from '@/types';
import { useEffect, useState } from 'react';
import { EditPopup, HybridField } from '.';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export default function AddProductPopup({ onAdd, styles }: AddRecipeBarProps) {

  const [name, setName] = useState('Name');
  const [number, setNumber] = useState('Amount');
  const [tags, setTags] = useState('Tags');

  const [showPopup, setShowBubble] = useState(false);
  const [isValidData, setIsValidData] = useState(false);

  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => {
        setShowBubble(false);
      }, 1000); // Dymek zniknie po 2 sekundach (2000ms)

      return () => clearTimeout(timeout);
    }
  }, [showPopup]);

  const title = "Add";

  function handleSubmit()
  {
    setShowBubble(true);
    if (onAdd(name, number, tags))
    {
        setName("Name");
        setNumber("Amount");
        setTags("Tags");
        setIsValidData(true);
        return;
    }
    setIsValidData(false);
  }

  return (
    <EditPopup title='' containerStyles={styles} buttonStyle='h-8 w-8 self-center place-items-center text-green-500 hover:text-green-400' 
      customButton={<PlusCircleIcon className='w-full h-full' title={title} />}
      panelStyle='bg-blue-300' windowStyle='ring-sky-600'> 
      <div className="grid grid-cols-1 bg-opacity-80 rounded-md">
        <HybridField title=""
          fieldName="Name"
          setTitle={(name) => { setName(name); return true; }}
          containerStyle="recipe__edit bg-blue-200"
          inputStyle="recipe__edit__input bg-blue-200"
          handleEnter={handleSubmit}
        />
        <HybridField title=""
          fieldName="Number"
          setTitle={(number) => { setNumber(number); return true; }}
          containerStyle="recipe__edit bg-sky-200"
          inputStyle="recipe__edit__input bg-sky-200"
          handleEnter={handleSubmit}
        />
        <HybridField title=""
          fieldName="Tags"
          setTitle={(tags) => { setTags(tags); return true; }}
          containerStyle="recipe__edit bg-blue-200"
          inputStyle="recipe__edit__input bg-blue-200"
          handleEnter={handleSubmit}
        />

        {showPopup &&
          <div className={`m-1 p-1 text-center outline-1 outline-none font-bold ${isValidData && "bg-green-300 text-gray-800" || "bg-sky-300 text-red-400"}  rounded-md transition-opacity duration-500 ease-out ${
            showPopup ? 'opacity-100' : 'opacity-0'
          }`}>
            {isValidData && "Succes" || "Failed"}
            </div>
          ||
          <div onClick={handleSubmit} className="m-1 p-1 text-center outline-1 outline-none hover:bg-opacity-20 hover:outline-slate-400 font-bold hover:text-slate-500 text-white bg-blue-500 rounded-md transition-opacity duration-500 ease-in">
            Create
          </div>
        }

      </div>
    </EditPopup>
  );
}