import { Recipe } from "@/utils/Recipe";
import { InputAndButton, Preview } from ".";
import { ActionType, DataSetProp } from "@/types"
//import { CheckCircleIcon, CheckIcon, MinusCircleIcon, MinusIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { MinusIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ProductMap } from "@/utils/Product";


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

    const chevronStyles = "text-sky-600 hover:text-sky-950";

  return (
    <div className={`recipe__line
      ${data.number > 0 ? "bg-indigo-600 hover:bg-violet-800" :
      "bg-sky-500 hover:bg-violet-600 bg-opacity-60" }`}>
        <XMarkIcon className="unselectable h-18 w-9  bg-black bg-opacity-30 text-orange-600 hover:bg-opacity-40 rounded-md" aria-hidden="true" onClick={handleClear}/>
        <InputAndButton title={data.name} handleValidText={handleNameChange} chevronStyles={chevronStyles} />
        <MinusIcon className="unselectable h-18 w-9  bg-black bg-opacity-30 text-red-600 hover:bg-opacity-40 rounded-md" aria-hidden="true" onClick={handleDecrement} />
        <InputAndButton title={data.number.toString()} handleValidText={handleNumberChange} chevronStyles={chevronStyles}  />
        <PlusIcon className="unselectable h-18 w-9 bg-black bg-opacity-30 text-sky-900 hover:bg-opacity-40 rounded-md" aria-hidden="true" onClick={handleIncrement} />
        <Preview title={data.printProductsOnly()} containerStyles="text-black " chevronStyles={chevronStyles} >
          <div
              className="absolute top-1 right-1 p-2 bg-slate-600 text-white rounded-md cursor-pointer hover:bg-slate-700 opacity-100 z-30"
            >
              Esc
          </div>
          <div onClick={handleTabChange} className="relative grid gap-8 bg-sky-200 bg-opacity-80 p-7 lg:grid-cols-2">
            {
              data.products.map((product, key) => (
                <div key={key}>
                  {ProductMap.getInstance().getByID(product.ArticleID)?.Name + " " + product.Number + " " + ProductMap.getInstance().getByID(product.ArticleID)?.Unit}
                </div>
              ))
            }
          </div>
        </Preview>
        {window.innerWidth > 768 &&
          <InputAndButton title={data.tags} handleValidText={handleTagChange} chevronStyles={chevronStyles}  />
        }
        <TrashIcon className="unselectable h-18 w-9  bg-black bg-opacity-30 text-stone-900 hover:bg-opacity-40 rounded-md" aria-hidden="true" onClick={handleDelete}/>
    </div>
  )
}

export default RecipeLine