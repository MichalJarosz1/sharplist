import { Popover, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

export interface EditPopupProps
{
  title: string;
  children?: ReactNode;
  containerStyles?: string;
  panelStyle?: string;
  windowStyle?: string;
}

const EditPopup = ({ title, children, containerStyles, panelStyle, windowStyle }: EditPopupProps) =>
{

  return (
    <div className={`flex-1 truncate ${containerStyles ? containerStyles: ""}`}>
      <Popover as="div" className="">
        {({ open }) => 
        (
          <>
            <Popover.Button 
              id="4"
              className="flex-nowrap flex justify-center align-middle w-full self-center bg-opacity-20 px-1 md:px-4 py-2 text-xs md:text-sm font-medium text-black
              hover:bg-opacity-30 outline-none"
             >
              {title}
             </Popover.Button >
            <Popover.Overlay className="fixed inset-0 opacity-70 backdrop-blur-sm" />
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl ">
                <div className={`overflow-hidden rounded-lg shadow-lg ring-1 ring-amber-600 ring-opacity-60 ${windowStyle? windowStyle: ""}  `}>
                  <div className={`relative grid gap-8 bg-amber-200 p-6 lg:grid-cols-2 bg-opacity-80 ${panelStyle? panelStyle: ""} `}>
                    {children}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default EditPopup;