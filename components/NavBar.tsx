"use client"
import { BellIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline'

import TabButton from "./TabButton";
import { NavBarProps } from '@/types';
import { Preview } from '.';



const nav = ({handleTabChange}: NavBarProps) => {
  return (
    <nav className="flex items-center justify-between mb-2 p-4 bg-slate-500 bg-opacity-40 text-opacity-80 font-extrabold rounded-md">
      <button className="flex items-center" onClick={() => handleTabChange("")}>
        <SparklesIcon className="h-8 w-8 mr-2 text-slate-300" aria-hidden="true"/>
      </button>
      <div className="flex flex-grow items-center justify-center space-x-4">
        <TabButton handleClick={() => handleTabChange("Products")} title="Products" elementStyles=' '/>
        <TabButton handleClick={() => handleTabChange("Recipies")} title="Recipies" elementStyles=' '/>
      </div>
      <div className="">
        <BellIcon className="h-8 w-8 text-slate-300" aria-hidden="true" />
      </div>
    </nav>
  );
};

export default nav;
