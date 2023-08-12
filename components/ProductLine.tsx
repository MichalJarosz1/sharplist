import { Product } from "@/utils/Product"
import { RecipeMap } from "@/utils/Recipe";
import { InputAndButton, TempNumber } from ".";
import { ActionType, DataSetProp, } from "@/types"
import { MinusIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'



const ProductLine = ({data, handleChange, applied}: DataSetProp<Product>) => 
{
    const handleNameChange = (newText: string): boolean => 
    {
      return handleChange({ id:data.ID, action: ActionType.updateName, value: newText });
    };

    const handleNumberChange = (newText: string): boolean => 
    {
      return handleChange({ id:data.ID, action: ActionType.updateNumber, value: newText });
    };
    

    const handleUnitChange = (newText: string): boolean =>
    {
      return handleChange({ id:data.ID, action: ActionType.updateUnit, value: newText });
    }
      
    const handleTagChange = (newText: string): boolean =>
    {
      return handleChange({ id:data.ID, action: ActionType.updateTags, value: newText });
    }
      
    const handleClear = (): boolean =>
    {
      return handleChange({ id:data.ID, action: ActionType.clear, value: "" });
    }
    
    const handleDecrement = (): boolean =>
    {
      return handleChange({ id:data.ID, action: ActionType.decrement , value: "" });
    }
    
    const handleIncrement = (): boolean => 
    {
      return handleChange({ id:data.ID, action: ActionType.increment , value: "" });
    }
      
    const handleDelete = (): boolean =>
    {
      if (confirm("Czy chcesz usunąć produkt z tej listy i z przepisów?"))
        return handleChange({ id:data.ID, action: ActionType.delete, value: "" });
      return false;
    }

    const handleMove = (): boolean =>
    {
      return handleChange({ id:data.ID, action: ActionType.move, value: "string or number but index" });
    }

    const handleApply = (recipeID?: number): void =>
    {
      handleChange( {id: data.ID, action: ActionType.applyTNumber, number: recipeID})
    }

    //<div className="flex flex-nowrap justify-between">
  return (
    <div className={`flex text-opacity-80 border-amber-400 rounded-md border-groove border-2 justify-items-start hover:cursor-pointer z-20
      ${data.Number > 0 ? "bg-amber-500 hover:bg-amber-700 " :
       "bg-amber-300 hover:bg-amber-600 bg-opacity-60" }`}>
        {/*<ChevronUpDownIcon className="unselectable h-18 w-9 bg-black bg-opacity-30 text-teal-600 hover:bg-opacity-40" aria-hidden="true" onClick={() => {}}/>*/}
        <XMarkIcon className="unselectable h-18 w-9  bg-black bg-opacity-30 text-orange-600 hover:bg-opacity-40" aria-hidden="true" onClick={handleClear}/>
        <InputAndButton title={data.Name} handleValidText={handleNameChange} />
        <MinusIcon className="unselectable h-18 w-9  bg-black bg-opacity-30 text-red-600 hover:bg-opacity-40" aria-hidden="true" onClick={handleDecrement} />
        <div className="justify-between flex flex-1 items-center">
          <InputAndButton title={data.Number.toString()} handleValidText={handleNumberChange} />
          <TempNumber value={data.tNumber} isPresent={!applied && data.tNumber > 0 } onApply={handleApply}>
            {RecipeMap.getInstance().getActiveRecipiesForProduct(data.ID).map( (recipe, key) => 
            (
                <div key={key} className="z-9999">
                  {recipe.name} 
                </div>
            ))}
          </TempNumber>
        </div>
        <PlusIcon className="unselectable h-18 w-9 bg-black bg-opacity-30 text-sky-700 hover:bg-opacity-40" aria-hidden="true" onClick={handleIncrement} />
        <InputAndButton title={data.Unit} handleValidText={handleUnitChange} />
        {window.innerWidth > 768 &&
        <InputAndButton title={data.Tags} handleValidText={handleTagChange}  />
        }
        <TrashIcon className="unselectable h-18 w-9  bg-black bg-opacity-30 text-stone-900 hover:bg-opacity-40" aria-hidden="true" onClick={handleDelete}/>
    </div>
  )
}

export default ProductLine