import { LStorage } from "@/utils/LStorage";
import { RecipeMap } from "@/utils/Recipe";
import { MouseEventHandler, ReactNode } from "react";

export interface NavBarProps
{
    handleTabChange: (tab: string) => void;
}

export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
  }

export interface IconButtonProps
{
    iconPath: string;
    title: string;
    handleClick: MouseEventHandler<HTMLButtonElement>;
}

export interface SearchBarProps
{
    onSearch: (searchTerm: string) => void;
    styles?: string;
    placeholder?: string;
}

export interface AddProductBarProps
{
    onAdd: (name:string, number: string, unit: string, tags: string) => Boolean;
    styles?: string;
}

export interface AddRecipeBarProps
{
    onAdd: (name:string, number: string, tags: string) => Boolean;
    styles?: string;
}

export interface InputAndButtonProps
{
    title: string;
    btnType?: "button" | "text";
    containerStyles?: string;
    textStyles?: string;
    handleValidText: (newText: string) => boolean;
}

export enum ActionType
{
    delete,
    updateName,
    updateNumber,
    updateUnit,
    updateTags,
    switchTab,
    clear,
    increment,
    decrement,
    move,
    updateProducts,
    createProduct,
    clearProducts,
    applyTNumber,
    default
}

export interface DatasetChangeHandleProps
{
    id: number;
    action: ActionType;
    number?: number;
    value?: string;
}

export interface DataSetProp<T>
{
    data: T;
    handleChange:(change: DatasetChangeHandleProps) => boolean;
    applied?: boolean;
}

export interface EllipsisTextProps
{
    title: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
    containerStyles?: string
    windowStyle?: string
}

export interface TempNumberProps
{
    value: number;
    isPresent: boolean;
    children?: ReactNode;
    onApply: (id?: number)=> void;
}

export interface CustomMenuProps
{
  text?: string;
  children?: ReactNode;
  handleLoadDefault?: () => void;
  handleReset?: () => void;
  handleShare?: () => void;
  LSHandle: LStorage;
}
