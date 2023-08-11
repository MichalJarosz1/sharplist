"use client"
import { TempNumberProps } from '@/types';
import { Menu, Transition } from '@headlessui/react'
import { DocumentCheckIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

const TempNumber = ({value, isPresent, children, onApply}: TempNumberProps) => 
{
  let n: number = Number(Number(value).toPrecision(4));

  const handleApply = () =>
  {
    onApply();
  }

  return (
    isPresent &&
      <Menu>
        <Menu.Button id="3" className="justify-self-end w-min text-gray-700 md:pr-2 md:mr-2 hover:bg-slate-600 hover:bg-opacity-20 rounded-md text-xs md:text-sm"> 
        +{n} 
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
        <Menu.Items className="absolute z-9999 backdrop-blur-sm bg-amber-300 bg-opacity-70 m-1 p-1 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
          {({ active }) => (
            <div onClick={handleApply}
            className={`${active ? 'bg-amber-500 text-white' : 'text-gray-900'}  
              group flex w-full items-center rounded-md px-2 py-2 text-sm`} >
              <DocumentCheckIcon className="w-5 h-5 mr-2"/>
              <button onClick={handleApply}>
                Apply
              </button>
            </div>
            )}
          </Menu.Item>
          <Menu.Item>
            <div
              className=" border-t-2 border-amber-100 p-1 m-1">
              <span>
                These recipies has added it: 
              </span>
              <div className="p-1">
                {children}
              </div>
            </div>
          </Menu.Item> 
        </Menu.Items>
        </Transition>
      </Menu>
  )

}

export default TempNumber