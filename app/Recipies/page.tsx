"use client"

import { Recipe, RecipeMap } from "@/utils/Recipe"
import { SearchBar, AddRecipeBar, RecipeLine, RecipeSingleTab, RecipeShortLine, NavBar } from "@/components"

import { ClipboardDocumentListIcon, NoSymbolIcon } from '@heroicons/react/24/outline'
import { useState } from "react"

import { ActionType, DatasetChangeHandleProps } from "@/types"
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd"
import { Product, ProductMap } from "@/utils/Product"



const recipiesMap = RecipeMap.getInstance();
//recipiesMap.loadDefault();


const RecipiesTab = () => 
{
  const [ products, setProducts ] = useState(ProductMap.getInstance());
  const [ recipies, setRecipies ] = useState(recipiesMap.getSortedArray());
  const [ subTab, setSubTab ] = useState(Recipe.NotValid);

  const handleSearch = (searchTerm: string): void => {
    setRecipies(recipiesMap.getSearchSorted(searchTerm))
  };

  const handleAdd = (name:string, number: string, tags: string): Boolean => 
  {
    const num = Number(number);
    
    if (name.length < 3 || name.length > 25 ||  isNaN(num) || num < 0 || tags.length > 35 )
      return false;

    let recipe  = new Recipe(name, num, [], tags);
    recipiesMap.addNew(recipe);
    setRecipies(recipiesMap.getSortedArray());
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

    recipiesMap.moveRecipeByID(Number(draggableId), Number(newID));
    setRecipies(recipiesMap.getSortedArray());
    recipiesMap.save();

  }

  const handleProductchange = (recipe: Recipe, change?: DatasetChangeHandleProps, newProduct?: Product): boolean =>
  {
    if(newProduct)
    {
      let number = newProduct.Number;
      newProduct.Number = 0;
      const isValidChange = products.addProductInFront(newProduct);
      if(isValidChange)
      {
        recipe.products.push({ArticleID: newProduct.ID, Number: number});
        products.save();
        setProducts(products);
      }
      return isValidChange;
    }

    if(!change) return false;
    const { id, action } = change;
    let { value } = change;
    value = value || "";

    let isValidChange = false;

    //const product = recipe.getFullProductCopyByID(id);
    const productFull = products.getByID(id);
    let productShort = recipe.getProductDumpByID(id);

    if(!productShort)
    {
      recipe.products.push({ArticleID:id, Number:0});
      productShort = recipe.getProductDumpByID(id);
    }

    if(productFull && productShort)
    {
      switch (action)
      {
        case ActionType.delete:
          recipe.removeProduct(id);
          products.removeByID(id);
          isValidChange = true;
          break;
        case ActionType.updateName:
          if (value.length > 2 && value.length < 26)
          {
            productFull.Name = value;
            isValidChange = true;
          }
          break;
        case ActionType.updateNumber:
          const num = Number(value);
          if (!isNaN(num) && num >= 0) 
          {
            productShort.Number = num;
            isValidChange = true;
          }
          else if (num === 0)
          {
            recipe.removeProduct(id);
            isValidChange = true;
          }
          break;
        case ActionType.updateUnit:
          if (value.length > 0 && value !== "" && value.length < 11) 
          {
            productFull.Unit = value;
            isValidChange = true;
          }
          break;
        case ActionType.updateTags:
          if (value.length < 35) 
          {
            productFull.Tags = value;
            isValidChange = true;
          }
          break;
        case ActionType.clear:
          recipe.removeProduct(id);
          isValidChange = true;
          break;
        case ActionType.increment:
          productShort.Number++;
          isValidChange = true;
          break;
        case ActionType.decrement:
          if (productShort.Number === 0)
            recipe.removeProduct(id);
          else
            productShort.Number = productShort.Number >= 1 ? productShort.Number - 1 : 0;
          isValidChange = true;
          break;
        case ActionType.move:
          isValidChange = products.moveProductByID(id, Number(value));
          break;
        default:
          break;
      }
    }

    if(isValidChange)
    {
      products.save();
      setProducts(products);
    }

    return isValidChange;

  }

  const handleChange = (change: DatasetChangeHandleProps, productChange?:DatasetChangeHandleProps, newProduct?: Product): boolean => {
    const { id, action } = change;
    let { value } = change;
    value = value || "";

    const recipe = recipiesMap.getByID(id);

    let isValidChange = false;
  
    if (recipe) 
    {
      switch (action) 
      {
        case ActionType.delete:
          recipiesMap.removeByID(id);
          isValidChange = true;
          products.updateTNumber(recipies);
          break;
        case ActionType.updateName:
          if (value.length > 2 && value.length < 26)
          {
            recipe.name = value;
            isValidChange = true;
          }
          break;
        case ActionType.updateNumber:
          const num = Number(value);
          if (!isNaN(num) && num >= 0) 
          {
            recipe.number = num;
            isValidChange = true;
            products.updateTNumber(recipies);
          }
          break;
        case ActionType.updateProducts:
          isValidChange = handleProductchange(recipe, productChange, newProduct);
          products.updateTNumber(recipies);
          break;
        case ActionType.updateTags:
          if (value.length < 35) 
          {
            recipe.tags = value;
            isValidChange = true;
          }
          break;
        case ActionType.clear:
          recipe.number = 0;
          isValidChange = true;
          products.updateTNumber(recipies);
          break;
        case ActionType.clearProducts:
          recipe.number = 0;
          recipe.products.forEach(p => {p.Number = 0;});
          recipe.products = [];
          products.save();
          setProducts(products);
          isValidChange = true;
          products.updateTNumber(recipies);
          break;
        case ActionType.increment:
          recipe.number++;
          isValidChange = true;
          products.updateTNumber(recipies);
          break;
        case ActionType.decrement:
          recipe.number = recipe.number >= 1 ? recipe.number - 1 : 0;
          isValidChange = true;
          products.updateTNumber(recipies);
          break;
        case ActionType.move:
          recipiesMap.moveRecipeToIndex(recipe.id, Number(value));
          throw new Error("Check value if is valid index");
          break;
        case ActionType.switchTab:
          setSubTab(recipe);
          isValidChange = true;
        break;
        case ActionType.createProduct:
          isValidChange = handleProductchange(recipe, productChange, newProduct)
          products.updateTNumber(recipies);
          break;
        default:
          break;
      }
      if(isValidChange)
        recipiesMap.save();
        setRecipies(recipiesMap.getSortedArray());
    }

    return isValidChange;
  };


  const getComponents = (): JSX.Element[] =>
  {
    const components: JSX.Element[] = [];

    recipies.forEach((item, index) =>
    {
      components.push(
      <Draggable 
        draggableId={item.id.toString()} 
        key={item.id}
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
            <RecipeLine data={item} handleChange={handleChange}/> ||
            <RecipeShortLine data={item} handleChange={handleChange}/> 
            }
          </div>
        )
        }
      </Draggable>
      );
    })

    return components
  }

  const components = getComponents();

  const resetList = (): void =>
  {
    if (confirm("Czy chcesz utworzyć nową listę?"))
    {
      recipiesMap.flatline();
      recipiesMap.save();
      setRecipies(recipiesMap.getSortedArray());
    }
  }

  return (
    <main className="md:m-2 -z-40">
      <NavBar/>
      <div>
        {
        subTab.id === -1 &&
         <>
         <div className="flex flex-row justify-between border-2 border-groove mb-1 rounded-md">
            <SearchBar onSearch={handleSearch} placeholder="Search recipies" styles="w-full bg-slate-300 rounded-r-xl rounded-l-sm" />
            <button type="button" onClick={resetList} className="h-8 w-8 text-red-500 m-2" aria-hidden="true">
              <NoSymbolIcon className="w-full h-full" title="New list"/>
            </button>
            <button type="button" className="h-8 w-8 text-blue-500 m-2" aria-hidden="true">
              <ClipboardDocumentListIcon className="w-full h-full" onClick={() => recipiesMap.copyRecipies()} title="Copy"/>
            </button>
          </div><AddRecipeBar onAdd={handleAdd} /><DragDropContext onDragEnd={handleDragEnd}>
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
        </>
        || <RecipeSingleTab recipe={subTab} handleSwitchBackTab={()=>setSubTab(Recipe.NotValid)} handleChange={handleChange}/>
                
      }

      </div>
    </main>
  );
}

export default RecipiesTab;
