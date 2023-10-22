import { BellIcon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'

import TabButton from "./TabButton";
import Link from 'next/link';



const nav = () => {

  const handleTabChange = (a:any): void =>
  {

  }
  
  return (
    <nav className="flex items-center justify-between mb-2 p-4 bg-slate-500 bg-opacity-40 text-opacity-80 font-extrabold rounded-md">
      <Link type="button" href="/" className="flex items-center">
        <HomeIcon className="h-8 w-8 mr-2 text-slate-200" aria-hidden="true" title="Home"/>
      </Link>
      <div className="flex flex-grow items-center justify-center space-x-4">
        <TabButton title="Products"  href="/Products" elementStyles=' '/>
        <TabButton title="Recipes"  href="/Recipes" elementStyles=' '/>
      </div>
      <div className="">
        <BellIcon className="h-8 w-8 ml-2 text-slate-200" aria-hidden="true" title="Notifications"/>
      </div>
    </nav>
  );
};

export default nav;
