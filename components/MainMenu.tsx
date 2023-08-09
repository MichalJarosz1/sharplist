"use client"
import { CustomMenuProps } from '@/types';
import { LStorage } from '@/utils/LStorage';
import { Menu } from '@headlessui/react'
import { DocumentMinusIcon, WrenchIcon } from '@heroicons/react/24/outline';


const MainMenu = ({text}: CustomMenuProps) => 
{

  const handleLoadDefault = (): void =>
  {
    LStorage.getInstance().loadDefault();
    LStorage.getInstance().saveObjects();
  }
  
  const handleReset = (): void =>
  {
    LStorage.getInstance().resetObjects();
  }


  return (
    <Menu>
    <Menu.Button className="w-min text-gray-700 p-2 m-2 hover:bg-slate-600 hover:bg-opacity-20 rounded-md"> {text}
    </Menu.Button>
    <Menu.Items 
      className="absolute left-1/2 transform -translate-x-1/2 mt-2 z-50 backdrop-blur-sm bg-amber-300 bg-opacity-70 m-1 p-1 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <Menu.Item>
      {({ active }) => (
        <div onClick={handleLoadDefault}
        className={`${active ? 'bg-amber-500 text-white' : 'text-gray-900'}  
          group flex w-full items-center rounded-md px-2 py-2 text-sm text-center `} >
          <WrenchIcon className="w-5 h-5 mr-2"/>
          <button>
            Load default settings
          </button>
        </div>
        )}
      </Menu.Item>
      <Menu.Item>
      {({ active }) => (
        <div onClick={handleReset}
        className={`${active ? 'bg-amber-500 text-white' : 'text-gray-900'}  
          group flex w-full items-center rounded-md px-2 py-2 text-sm `} >
          <DocumentMinusIcon className="w-5 h-5 mr-2"/>
          <button>
            Reset
          </button>
        </div>
        )}
      </Menu.Item>
    </Menu.Items>
  </Menu>
  )
}

export default MainMenu;