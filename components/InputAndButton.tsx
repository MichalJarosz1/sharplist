"use client";
import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { InputAndButtonProps } from '@/types';
import React from 'react';

function InputAndButton({ title, containerStyles, chevronStyles, handleValidText }: InputAndButtonProps) {
  const [text, setText] = useState(title);
  const [play, setPlay ] = useState(false);

  let n: number = Number(Number(title).toPrecision(4));

  if(n && !isNaN(n))
    title = n.toString();

  function handleInputChange(newText: string) 
  {
    setText(newText);
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>): boolean =>
  {
    if (e.key === 'Enter') 
    {
      if (text !== "" && handleValidText(text))
      {
        title = text;
        return true;
      }
      else
      {
        setText(title);
      }
    }
    return false;
  }


  useEffect(() => {
    setTimeout(() => setPlay(true), 0);
    return () => {
      setTimeout(() => setPlay(false), 400);
    };
  }, [title])

  return (
    <div className={`flex-1 truncate ${containerStyles ? containerStyles: ""}`}>
      <Popover as="div" className="">
      {({ open }) => 
      (
        <>
        <div>
          <Popover.Button
            id="1" // both server and client must have same ids
            className="flex-nowrap flex justify-center md:justify-between  w-full bg-opacity-20 px-1 md:px-4 py-2 text-xs md:text-sm font-medium text-black
             hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <div className="unselectable animate-pulsing justify-self-end"
            >
              {title}
            </div>
            {window.innerWidth > 768 &&
            <ChevronDownIcon 
              className={`ml-2 -mr-1 h-5 w-5 invisible md:visible ${chevronStyles ? chevronStyles: ""} `}
              aria-hidden="true"
              title="Extend"
            />
            }
          </Popover.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel className="z-9999">
          {({ close }) => (
            <div className="px-1 py-1">
                  <input
                    className="bg-sky-500 text-white w-full rounded-md px-2 py-2 text-sm"
                    value={text}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={(e)=> {if(handleEnterKey(e)) setTimeout(() => close(), 100)}}
                    autoFocus
                  />
            </div>
          )}
          </Popover.Panel>
        </Transition>
        </>
      )}
      </Popover>
    </div>
  );
}

export default InputAndButton;
