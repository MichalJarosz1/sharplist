"use client"

import { AddProductBarProps } from '@/types';
import { useEffect, useState } from 'react';
import { EditPopup, HybridField } from '.';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export default function AddProductPopup({ onAdd, styles }: AddProductBarProps) {

  const [name, setName] = useState('Name');
  const [number, setNumber] = useState('Amount');
  const [unit, setUnit] = useState('Unit');
  const [tags, setTags] = useState('Tags');

  const [showPopup, setShowBubble] = useState(false);
  const [isValidData, setIsValidData] = useState(false);

  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => {
        setShowBubble(false);
      }, 1500); // Dymek zniknie po 2 sekundach (2000ms)

      return () => clearTimeout(timeout);
    }
  }, [showPopup]);

  const title = "Add";

  function handleSubmit()
  {
    setShowBubble(true);
    if (onAdd(name, number, unit, tags))
    {
        setName("Name");
        setNumber("Amount");
        setUnit("Unit");
        setTags("Tags");
        setIsValidData(true);
        return;
    }
    setIsValidData(false);
  }

  return (
    <EditPopup title='' containerStyles={styles} buttonStyle='h-8 w-8 text-green-500 hover:text-green-400' 
      customButton={<PlusCircleIcon className='w-full h-full' title={title} />}>
      <div className="grid grid-cols-1 bg-opacity-80 rounded-md">
        <HybridField title=""
          fieldName="Name"
          setTitle={(name) => { setName(name); return true; }}
          containerStyle="product__edit bg-orange-200"
          inputStyle="product__edit__input bg-orange-200"
          handleEnter={handleSubmit}
        />
        <HybridField title=""
          fieldName="Number"
          setTitle={(number) => { setNumber(number); return true; }}
          containerStyle="product__edit bg-orange-100"
          inputStyle="product__edit__input bg-orange-100"
          handleEnter={handleSubmit}
        />
        <HybridField title=""
          fieldName="Unit"
          setTitle={(unit) => { setUnit(unit); return true; }}
          containerStyle="product__edit bg-orange-200"
          inputStyle="product__edit__input bg-orange-200"
          handleEnter={handleSubmit}
        />
        <HybridField title=""
          fieldName="Tags"
          setTitle={(tags) => { setTags(tags); return true; }}
          containerStyle="product__edit bg-orange-100"
          inputStyle="product__edit__input bg-orange-100"
          handleEnter={handleSubmit}
        />

        {showPopup &&
          <div className={`m-1 p-1 text-center outline-1 outline-none font-bold ${isValidData && "bg-green-300 text-gray-800" || "bg-orage-300 text-red-400"}  rounded-md transition-opacity duration-500 ease-out ${showPopup ? 'opacity-100' : 'opacity-0'
            }`}>
            {isValidData && "Succes" || "Failed"}
          </div>
          ||
          <div onClick={handleSubmit} className="m-1 p-1 text-center outline-1 outline-none hover:bg-opacity-20 hover:outline-slate-400 font-bold hover:text-slate-400 text-white bg-orange-300 rounded-md transition-opacity duration-500 ease-in">
            Create
          </div>
        }

      </div>
    </EditPopup>
  );
}