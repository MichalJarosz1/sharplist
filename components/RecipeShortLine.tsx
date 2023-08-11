import { Recipe } from "@/utils/Recipe";
import { EditPopup, HybridField, InputAndButton, Preview } from ".";
import { ActionType, DataSetProp } from "@/types"
//import { CheckCircleIcon, CheckIcon, MinusCircleIcon, MinusIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { MinusIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'


const RecipeShortLine = ({data, handleChange}: DataSetProp<Recipe>) => 
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
      
    const handleDelete = (): boolean =>
    {
      if (confirm("Deleteing a recipe is irreversible!"))
        return handleChange({ id:data.id, action: ActionType.delete});
      return false;
    }

    const handleTabChange = (): boolean =>
    {
      return handleChange({ id:data.id, action: ActionType.switchTab });
    }

  return (
    <div className={`flex text-opacity-80 border-blue-950 rounded-md border-groove border-2 justify-items-start hover:cursor-pointer + 
      ${data.number > 0 ? "bg-indigo-600 hover:bg-violet-800" :
      "bg-sky-500 hover:bg-violet-600 bg-opacity-60" }`}>
        <XMarkIcon className="unselectable h-18 w-9  bg-black bg-opacity-30 text-orange-600 hover:bg-opacity-40" aria-hidden="true" onClick={handleClear}/>
        <EditPopup title={data.name} panelStyle="bg-sky-300" windowStyle="ring-blue-500">
          <div className="grid grid-cols-1 bg-opacity-80 rounded-md z-[100] ">
            <HybridField title={data.name} 
              fieldName="Name"
              setTitle={handleNameChange}
              containerStyle="recipe__edit bg-sky-200"
              inputStyle="recipe__edit__input bg-sky-200"
            />
            <HybridField title={Number(data.number.toPrecision(4)).toString()} 
              fieldName="Number"
              setTitle={handleNumberChange}
              containerStyle="recipe__edit bg-blue-200"
              inputStyle="recipe__edit__input bg-blue-200"
            />
            <HybridField title={data.tags} 
              fieldName="Tags"
              setTitle={handleTagChange}
              containerStyle="recipe__edit bg-sky-200"
              inputStyle="recipe__edit__input bg-sky-200"
            />
            <div className="recipe__edit bg-blue-200">
              <span>Products</span>
              <span>{">"}</span>
              <div className="recipe__edit__input bg-blue-200"
                onClick={handleTabChange}
              >
                Edit...
              </div>
            </div>

          </div>
        </EditPopup>
        <MinusIcon className="unselectable h-18 w-9  bg-black bg-opacity-30 text-red-600 hover:bg-opacity-40" aria-hidden="true" onClick={handleDecrement} />
        <InputAndButton title={data.number.toString()} handleValidText={handleNumberChange} />
        <PlusIcon className="unselectable h-18 w-9 bg-black bg-opacity-30 text-sky-900 hover:bg-opacity-40" aria-hidden="true" onClick={handleIncrement} />

        <TrashIcon className="unselectable h-18 w-9  bg-black bg-opacity-30 text-stone-900 hover:bg-opacity-40" aria-hidden="true" onClick={handleDelete}/>
    </div>
  )
}

export default RecipeShortLine