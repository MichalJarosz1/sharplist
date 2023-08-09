import { MouseEventHandler } from "react";

interface TabButtonProps
{
    title: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    elementStyles?: string;
}

const button = ({title, handleClick, elementStyles} : TabButtonProps) => {
  return (
    <button type="button"
        onClick={handleClick} 
        className={`unselectable flex-grow w-full py-2 px-4 rounded-md shadow-md text-sm font-bold text-black hover:text-white hover:shadow-2xl
        bg-slate-600 bg-opacity-30 hover:bg-opacity-20 hover:outline-2 outline-black
        ${elementStyles ? elementStyles : 'hover:bg-teal-600'}`}>
        {title}
    </button>
  )
}

export default button