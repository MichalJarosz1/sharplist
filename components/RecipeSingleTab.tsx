"use client"

import { Recipe, RecipeMap } from "@/utils/Recipe"
import { SearchBar, ProductLine, AddProductBar, RecipeEditNav, ProductShortLine } from "@/components"

import { ClipboardDocumentListIcon, NoSymbolIcon } from '@heroicons/react/24/outline'
import { useState } from "react"

import { ActionType, DatasetChangeHandleProps } from "@/types"
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd"
import { Product } from "@/utils/Product"


interface RecipeProps
{
    recipe: Recipe;
    handleChange(change: DatasetChangeHandleProps, productChange?: DatasetChangeHandleProps, newProduct?: Product): boolean
    handleSwitchBackTab(): void;
}

const recipiesMap = RecipeMap.getInstance();

const RecipeSingleTab = ({recipe, handleSwitchBackTab, handleChange} : RecipeProps) => 
{
    const getComponents = (data: Product[]): JSX.Element[] =>
    {
      const components: JSX.Element[] = [];
    
      data.forEach((item, index) =>
      {
        components.push(
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
      })
    
      return components
    }

  const [components, setComponents] = useState(getComponents(recipe.getSorted()));

  const handleSearch = (searchTerm: string): void => 
  {
    setComponents(getComponents(recipe.getSearchSorted(searchTerm)));
  }

  const handleAdd = (name:string, number: string, unit: string, tags: string): Boolean => 
  {
    const num = Number(number);
    
    if (name.length < 3 || name.length > 25 ||  isNaN(num) || num < 0 || unit.length < 1 || unit === "" || unit.length > 10 || tags.length > 35 )
      return false;

    let product  = new Product(name, num, unit, tags);
    handleChange( { id: recipe.id, action: ActionType.createProduct }, undefined, product );
    setComponents(getComponents(recipe.getSorted())); //test if needed
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
    setComponents(getComponents(recipe.getSorted())); //test if needed
  }

  const handleEdit = (change: DatasetChangeHandleProps): boolean =>
  {
    const { id, action } = change;
    let { value } = change;
    value = value || "";
  

    let isValidChange = false;
  
    switch (action) {
      case ActionType.delete:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.delete} );
        break;
      case ActionType.updateName:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.updateName, value: value} );
        break;
      case ActionType.updateNumber:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.updateNumber, value: value}) ;
        break;
      case ActionType.updateUnit:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.updateUnit, value: value} );
        break;
      case ActionType.updateTags:
        isValidChange = handleChange( { id: recipe.id, action: ActionType.updateProducts }, {id: id, action: ActionType.updateTags, value: value} );
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
      setComponents(getComponents(recipe.getSorted())); //test if needed

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
      <div className="flex flex-row justify-between border-2 border-groove mb-1 rounded-md">
          <SearchBar onSearch={handleSearch} placeholder="Search products..." styles = "w-full bg-lime-100"/>
          <button type="button" onClick={resetList} className="h-8 w-8 text-red-500 m-2" aria-hidden="true" >
            <NoSymbolIcon className="w-full h-full" title="New list"/>
          </button>
          <button type="button" className="h-8 w-8 text-blue-500 m-2" aria-hidden="true">
            <ClipboardDocumentListIcon className="w-full h-full" onClick={()=> recipiesMap.copyRecipies()} title="Copy"/>
          </button>
      </div>
      <AddProductBar onAdd={handleAdd}/>
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
