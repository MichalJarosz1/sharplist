import { Product } from "@/utils/Product"
import { RecipeMap } from "@/utils/Recipe";
import { TempNumber, EditPopup, HybridField, CustomInput, InputAndButton } from ".";
import { ActionType, DataSetProp, } from "@/types"
import { MinusIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'

const ProductShortLine = ({data, handleChange, applied}: DataSetProp<Product>) => 
{
    const handleNameChange = (newText: string): boolean => 
    {
      return handleChange({ id:data.ID, action: ActionType.updateName, value: newText });
    }
    const handleNumberChange = (newText: string): boolean => 
    {
      return handleChange({ id:data.ID, action: ActionType.updateNumber, value: newText });
    }
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
      return  handleChange({ id:data.ID, action: ActionType.decrement , value: "" });
    }
    const handleIncrement = (): boolean => 
    {
      return  handleChange({ id:data.ID, action: ActionType.increment , value: "" });
    }
    const handleDelete = (): boolean =>
    {
      if (confirm("Czy chcesz usunąć produkt z tej listy i z przepisów?"))
        return handleChange({ id:data.ID, action: ActionType.delete, value: "" });
      return false;
    }

    const handleApply = (recipeID?: number): void =>
    {
      handleChange( {id: data.ID, action: ActionType.applyTNumber, number: recipeID})
    }
    
  return (
    <div className={`flex text-opacity-80 border-blue-950 rounded-md border-groove border-2 justify-items-start hover:cursor-pointer
      ${data.Number > 0 ? "bg-amber-500 hover:bg-amber-700 " :
       "bg-amber-300 hover:bg-amber-600 bg-opacity-60" }`}>

        {/*<ChevronUpDownIcon className="unselectable h-18 w-9 bg-black bg-opacity-30 text-teal-600 hover:bg-opacity-40" aria-hidden="true" onClick={() => {}}/>*/}
        <XMarkIcon className="h-18 w-9  bg-black bg-opacity-30 text-orange-600 hover:bg-opacity-40" aria-hidden="true" onClick={handleClear}/>

        <EditPopup title={data.Name}>
        <div className="grid grid-cols-1 bg-opacity-80 rounded-md z-[100] ">
          <HybridField title={data.Name} 
            fieldName="Name"
            setTitle={handleNameChange}
            containerStyle="product__edit bg-amber-100 "
            inputStyle="product__edit__input bg-amber-100 "
          />
           <HybridField title={Number(data.Number.toPrecision(4)).toString()} 
              fieldName="Number"
              setTitle={handleNumberChange}
              containerStyle="product__edit bg-orange-100"
              inputStyle="product__edit__input bg-orange-100"
            />
          <HybridField title={data.Unit} 
              fieldName="Unit"
              setTitle={handleUnitChange}
              containerStyle="product__edit bg-amber-100"
              inputStyle="product__edit__input bg-amber-100"
            />
          <HybridField title={data.Tags} 
              fieldName="Tags"
              setTitle={handleTagChange}
              containerStyle="product__edit bg-orange-100"
              inputStyle="product__edit__input bg-orange-100"
            />
        </div>
        </EditPopup>

        <MinusIcon className="unselectable h-18 w-9  bg-black bg-opacity-30 text-red-600 hover:bg-opacity-40" aria-hidden="true" onClick={handleDecrement} />
        <div className="justify-between flex flex-1 items-center">
          <InputAndButton title={Number(data.Number.toPrecision(4)).toString()}
            handleValidText={handleNumberChange}
          />
          <TempNumber value={data.tNumber} isPresent={!applied && data.tNumber > 0 } onApply={handleApply}>
            {RecipeMap.getInstance().getActiveRecipiesForProduct(data.ID).map( (recipe, key) => 
            (
                <div key={key} className="z-50">
                  {recipe.name} 
                </div>
            ))}
          </TempNumber>
        </div>
        <PlusIcon className="unselectable h-18 w-9 bg-black bg-opacity-30 text-sky-700 hover:bg-opacity-40" aria-hidden="true" onClick={handleIncrement} />
        <TrashIcon className="unselectable h-18 w-9  bg-black bg-opacity-30 text-stone-900 hover:bg-opacity-40" aria-hidden="true" onClick={handleDelete} />
      
    </div>
  )
}

export default ProductShortLine