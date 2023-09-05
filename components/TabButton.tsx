import Link from "next/link";
import { MouseEventHandler } from "react";

interface TabButtonProps
{
    title: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    elementStyles?: string;
    href?: string;
}

const button = ({title, elementStyles, href} : TabButtonProps) => {
  return (
    <Link type="button"
        className={`text-center unselectable flex-grow w-full py-2 px-4 rounded-md shadow-md text-sm font-bold text-black hover:text-white hover:shadow-2xl
        bg-slate-600 bg-opacity-30 hover:bg-opacity-20 hover:outline-2 outline-black
        ${elementStyles ? elementStyles : 'hover:bg-teal-600'}`}
        href={href || ""}
        >
        {title}
    </Link>
  )
}

export default button