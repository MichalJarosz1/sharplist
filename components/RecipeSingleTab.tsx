"use client"

import { RecipeMap } from "@/utils/Recipe"
import { SearchBar, ProductLine, RecipeEditNav, ProductShortLine, AddProductPopup } from "@/components"

import { ClipboardDocumentListIcon, LockOpenIcon, NoSymbolIcon } from '@heroicons/react/24/outline'
import { useState } from "react"

import { ActionType, DatasetChangeHandleProps } from "@/types"
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd"
import { Product } from "@/utils/Product"


interface RecipeProps
{
    recipeID: number;
    handleChange(change: DatasetChangeHandleProps, productChange?: DatasetChangeHandleProps, newProduct?: Product): boolean
    handleSwitchBackTab(): void;
}


const RecipeSingleTab = ({recipeID, handleSwitchBackTab, handleChange} : RecipeProps) => 
{
  
  const [recipesMap, setRecipesMap] = useState(RecipeMap.getInstance());
  const recipe = recipesMap.getByID(recipeID);
  if(!recipe) return;
  
  const [visibleProducts, setVisibleProducts] = useState(recipe.getSorted());
  
  const getComponents = () =>
  {
    const components: JSX.Element[] = [];
  
    visibleProducts.forEach((item, index) =>
    {
      {
        components.push
        (
          <Draggable 
          draggableId={item.ID.toString()} 
          key={item.ID}
          index={index} 
          disableInteractiveElementBlocking // works on contenteditable components
          >
        {(provided) => (
          <div 
          {...provided.dragHandleProps}
          {...provided.draggableProps} 
          ref={provided.innerRef}
          >
            {window.innerWidth > 768 &&
            <ProductLine data={item} handleChange={handleEdit} applied={true} /> ||
            <ProductShortLine data={item} handleChange={handleEdit} applied={true} /> 
            }
          </div>
        )
        }
      </Draggable>
      );
      }
  })
    return components
  }

  const components = getComponents();

  const handleSearch = (searchTerm: string): void => {

    setVisibleProducts(recipe.getSearchSorted(searchTerm));
  };

  const handleAdd = (name:string, number: string, unit: string, tags: string): Boolean => 
  {
    const num = Number(number);
    
    if (name.length < 3 || name.length > 25 ||  isNaN(num) || num < 0 || unit.length < 1 || unit === "" || unit.length > 10 || tags.length > 35 )
      return false;

    let product  = new Product(name, num, unit, tags);
    handleChange( { id: recipe.id, action: ActionType.createProduct }, undefined, product );
    setVisibleProducts((recipe.getSorted())); //test if needed
    return true;
  }

  const handleDragEnd = (result: DropResult): void =>
  {
    const {draggableId, destination} = result;
    
    if (!destination) 
    {
      return;
    }

    const newID = components[destination.index].key;
    if(!newID)
    {
      return;
    }

    handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: Number(draggableId), action: ActionType.move, value: newID.toString() } );
    setVisibleProducts(recipe.getSorted()); //test if needed
  }

  const handleEdit = (change: DatasetChangeHandleProps): boolean =>
  {
    const { id, action } = change;
    let { value } = change;
    value = value || "";
  

    let isValidChange = false;
  
    switch (action) {
      case ActionType.delete:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.delete});
        break;
      case ActionType.updateName:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.updateName, value: value});
        break;
      case ActionType.updateNumber:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.updateNumber, value: value});
        break;
      case ActionType.updateUnit:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.updateUnit, value: value});
        break;
      case ActionType.updateTags:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.updateTags, value: value});
        break;
      case ActionType.clear:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.clear} );
        break;
      case ActionType.increment:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.increment} );
        break;
      case ActionType.decrement:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.decrement} );
        break;
      case ActionType.move:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.move} );
        throw new Error("Check value if is valid index");
        break;
      case ActionType.switchTab:
        handleSwitchBackTab();
        break;
      default:
        break;
    }

    if(isValidChange)
    {
      setVisibleProducts(recipe.getSorted()); //test if needed
    }
    return isValidChange;
  };

  const handleRecipeChange = (change: DatasetChangeHandleProps): boolean =>
  {
    let { action, value } = change;
    value = value || "";
  

    let isValidChange = false;
  
    switch (action) 
    {
      case ActionType.delete:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.delete} );
        break;
      case ActionType.updateName:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateName, value: value } );
        break;
      case ActionType.updateNumber:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateNumber, value: value } );
        break;
      case ActionType.updateTags:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateTags, value: value } );
        break;
      case ActionType.clear:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.clear} );
        break;
      case ActionType.clearProducts:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.clearProducts} );
        break;
      case ActionType.increment:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.increment} );
        break;
      case ActionType.decrement:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.decrement} );
        break;
      case ActionType.switchTab:
        handleSwitchBackTab();
        break;
      default:
        break;
    }

    return isValidChange;
  }
  
  const resetList = (): void =>
  {
    if (confirm("Do you want to clear products from this list?"))
    {
      handleRecipeChange({id: recipe.id, action: ActionType.clearProducts });
    }
  }
  

  return (
    <div>
      <div className="flex flex-row justify-between mb-1 h-max rounded-md place-items-center ">
          <SearchBar onSearch={handleSearch} placeholder="Search products..."/>
          <AddProductPopup onAdd={handleAdd} styles=""/>
          <button type="button" onClick={resetList} className="w-8 h-8 mx-1 text-red-500 hover:text-red-700" aria-hidden="true" >
            <NoSymbolIcon className="w-full h-full" title="New list"/>
          </button>
          <button type="button" className="w-8 h-8 mx-1 text-sky-500 hover:text-sky-700" aria-hidden="true">
              <ClipboardDocumentListIcon className="w-full h-full" onClick={() => recipesMap.copyRecipies()} title="Copy"/>
            </button>
            <button type="button" className="w-8 h-8 mx-1 text-slate-400 hover:text-slate-600" aria-hidden="true">
              <LockOpenIcon className="w-full h-full" onClick={()=> {}} title="Edit Mode"/>
            </button>
      </div>
      <RecipeEditNav data={recipe} handleChange={handleRecipeChange} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ProductsMain">
          {(provided) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {components}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default RecipeSingleTab;
