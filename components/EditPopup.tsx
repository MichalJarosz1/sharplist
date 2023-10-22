import { Popover, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

export interface EditPopupProps
{
  title: string;
  customButton?: ReactNode;
  children?: ReactNode;
  containerStyles?: string;
  buttonStyle?: string;
  panelStyle?: string;
  windowStyle?: string;
}

const EditPopup = ({ title, customButton,  children, containerStyles, buttonStyle, panelStyle, windowStyle, }: EditPopupProps) =>
{
  buttonStyle = buttonStyle || "";

  return (
      <Popover as={Fragment}>
        {customButton &&
          <Popover.Button 
            id="4"
            className={`${buttonStyle} `}
          >
             {customButton}
          </Popover.Button>
        ||
          <Popover.Button 
            id="4"
            className={`flex-1 w-full justify-center bg-opacity-20 md:px-4 text-xs md:text-sm font-medium text-black
            hover:bg-opacity-30 outline-none ${buttonStyle}`}
          >
             {title}
          </Popover.Button>
        }

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
          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 translate-y-1/2 md:-translate-x-1/2 transform  px-4 sm:px-0 lg:max-w-3xl ">
            <div className={`overflow-hidden rounded-lg shadow-lg ring-1 ring-amber-600 ring-opacity-60 ${windowStyle? windowStyle: ""}  `}>
              <div className={`relative grid gap-8 bg-amber-200 p-6 bg-opacity-80 ${panelStyle? panelStyle: ""} `}>
                {children}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
  )
}

export default EditPopup;