"use client"
import { Popover , Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { EllipsisTextProps, } from '@/types';
import React from 'react';

function Preview({ title, children, containerStyles,  windowStyle }: EllipsisTextProps) 
{

  let n: number = Number(Number(title).toPrecision(4));

  if(n && !isNaN(n))
    title = n.toString();

  return (
    <div className={`flex-1 truncate  ${containerStyles ? containerStyles: ""}`}>
      <Popover as="div" className="">
      {({ open }) => (
        <>
        <div>
          <Popover.Button
            id="2" // both server and client must have same ids
            className="flex-nowrap flex justify-between w-full bg-opacity-20 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <span className="animate-pulsing "
            >
              {title}
            </span>
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
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
          <Popover.Panel className={`fixed top-1/4 left-1/2 -translate-x-1/2 z-9999 backdrop-blur-sm mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl text-center ${windowStyle ? windowStyle: ""}`}>
          {({ close }) => (
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5" onClick={()=>close()}> {/* delete this if you don't want to close the Panel */}
              {children}
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

export default Preview;
