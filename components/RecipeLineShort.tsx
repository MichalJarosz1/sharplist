import { Recipe } from "@/utils/Recipe";
import { InputAndButton } from ".";
import { ActionType, DataSetProp } from "@/types"
import { MinusIcon, PlusIcon, TrashIcon, XMarkIcon, ArrowUpLeftIcon } from '@heroicons/react/24/outline'


const RecipeLine = ({data, handleChange}: DataSetProp<Recipe>) => 
{
    const handleNameChange = (newText: string): boolean => 
    {
      return handleChange({ id:data.id, action: ActionType.updateName, value: newText });
    };

    const handleNumberChange = (newText: string): boolean => 
    {
      return handleChange({ id:data.id, action: ActionType.updateNumber, value: newText });
    };
    
    const handleTagChange = (newText: string): boolean =>
    {
      return handleChange({ id:data.id, action: ActionType.updateTags, value: newText });
    };
      
    const handleClear = (): boolean =>
    {
      return handleChange({ id:data.id, action: ActionType.clear });
    };
    
    const handleDecrement = (): boolean =>
    {
      return handleChange({ id:data.id, action: ActionType.decrement});
    };
    
    const handleIncrement = (): boolean => 
    {
      return handleChange({ id:data.id, action: ActionType.increment});
    };
      
    const handleDelete = (): void =>
    {
      if(handleChange({ id:data.id, action: ActionType.delete}))
      handleChange({ id:data.id, action: ActionType.switchTab });
    }

    const handleTabChange = (): void =>
    {
      handleChange({ id:data.id, action: ActionType.switchTab });
    }

  return (
    <div className={`my-4 flex text-opacity-80 border-blue-950 rounded-md border-groove border-2 justify-items-stretch hover:cursor-pointer + 
      ${data.number > 0 ? "bg-indigo-600 hover:bg-violet-800" :
      "bg-sky-500 hover:bg-violet-600 bg-opacity-50" }`}>
        <ArrowUpLeftIcon className="self-stretch unselectable h-18 w-9 bg-black bg-opacity-30 text-blue-600 hover:bg-opacity-40" aria-hidden="true" onClick={handleTabChange}/>
        <XMarkIcon className="self-stretch unselectable h-18 w-9  bg-black bg-opacity-30 text-orange-600 hover:bg-opacity-40" aria-hidden="true" onClick={handleClear}/>
        <MinusIcon className="self-stretch unselectable h-18 w-9  bg-black bg-opacity-30 text-red-600 hover:bg-opacity-40" aria-hidden="true" onClick={handleDecrement} />
        <PlusIcon className="self-stretch unselectable h-18 w-9 bg-black bg-opacity-30 text-sky-700 hover:bg-opacity-40" aria-hidden="true" onClick={handleIncrement} />
        <InputAndButton title={data.name} handleValidText={handleNameChange} />
        <InputAndButton title={data.number.toString()} handleValidText={handleNumberChange} />
        <InputAndButton title={data.tags} handleValidText={handleTagChange} />
        <TrashIcon className="self-stretch unselectable h-18 w-9  bg-black bg-opacity-30 text-stone-900 hover:bg-opacity-40" aria-hidden="true" onClick={handleDelete}/>
    </div>
  )
}

export default RecipeLine