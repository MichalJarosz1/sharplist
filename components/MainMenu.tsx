"use client"
import { createShare } from '@/app/actions';
import { CustomMenuProps } from '@/types';
import { Menu } from '@headlessui/react'
import { useRouter } from 'next/navigation';
import { DocumentMinusIcon, WrenchIcon, ShareIcon, ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';

const MainMenu = ({text, LSHandle, handleShare }: CustomMenuProps) => 
{
  const router = useRouter();
  
  const handleLoadDefault = (): void =>
  {
    LSHandle.loadDefault();
    LSHandle.saveObjects();
  }
  
  const handleReset = (): void =>
  {
    if(confirm("this will irreversibly remove all settings."))
    {
      LSHandle.resetObjects();
    }
  }

  const handleImport = (): void =>
  {
    let hash = prompt("Enter sharable link or hashed key: ", "example: 868b6330-811d-48cb-a85f-23d12f71d843");

    if(!hash) return;
    
    const pathname = window.location.href;

    hash = hash.replace(pathname+"share/", "");
    hash = hash.replace(pathname,"");
    
    router.push(`/share/${hash}`);

    console.log(hash);
  }

  return (
    <div className='font-mono m-2 bottom-0 text-center text-slate-200 unselectable'>
      Create your shopping list smoothly.<br/>
      <Menu>
        <Menu.Button id="6" className="w-min text-gray-700 p-2 m-2 hover:bg-slate-600 hover:bg-opacity-20 rounded-md"> { text || "Start!"}
        </Menu.Button>
        <Menu.Items 
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 z-50 backdrop-blur-sm bg-amber-300 bg-opacity-70 m-1 p-1 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
            {({ active }) => (
              <div onClick={handleLoadDefault}
              className={`${active ? 'bg-amber-500 text-white' : 'text-gray-900'}  
                group flex w-full items-center rounded-md px-2 py-2 md:text-sm text-xs text-center`} >
                <WrenchIcon className="w-5 h-5 mr-2"/>
                <button>
                  Load Test Settings
                </button>
              </div>
              )}
            </Menu.Item>
            <Menu.Item>
            {({ active }) => (
              <div onClick={handleReset}
              className={`${active ? 'bg-amber-500 text-white' : 'text-gray-900'}  
                group flex w-full items-center rounded-md px-2 py-2 md:text-sm text-xs`} >
                <DocumentMinusIcon className="w-5 h-5 mr-2"/>
                <button>
                  Reset
                </button>
              </div>
              )}
            </Menu.Item>
            <Menu.Item>
            {({ active }) => (
              <div onClick={handleShare}
                className={`${active ? 'bg-amber-500 text-white' : 'text-gray-900'}  
                group flex w-full items-center rounded-md px-2 py-2 md:text-sm text-xs `} >
                <ShareIcon className="w-5 h-5 mr-2"/>
                <button type="submit"
                >
                  Share
                </button>
              </div>
              )}
            </Menu.Item>
            <Menu.Item>
            {({ active }) => (
              <div onClick={handleImport}
              className={`${active ? 'bg-amber-500 text-white' : 'text-gray-900'}  
                group flex w-full items-center rounded-md px-2 py-2 md:text-sm text-xs `} >
                <ArrowDownOnSquareIcon className="w-5 h-5 mr-2"/>
                <button>
                  Import lists
                </button>
              </div>
              )}
            </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default MainMenu;