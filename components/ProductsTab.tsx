"use client"

import { Product, ProductMap } from "@/utils/Product"
import { SearchBar, AddProductBar, ProductLine } from "@/components"

import { ClipboardDocumentListIcon, NoSymbolIcon } from '@heroicons/react/24/outline'
import { useState } from "react"

import { ActionType, DatasetChangeHandleProps } from "@/types"
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd"
import { RecipeMap } from "@/utils/Recipe"


const ProductsTab = () => 
{
  const productsMap = ProductMap.getInstance();
  //productsMap.loadDefault();

  productsMap.updateTNumber(RecipeMap.getInstance().array);

  const [products, setProducts] = useState(productsMap.getSortedArray());

  const handleSearch = (searchTerm: string): void => {
    setProducts(productsMap.getSearchSorted(searchTerm))
  };

  const handleAdd = (name:string, number: string, unit: string, tags: string): Boolean => 
  {
    const num = Number(number);
    
    if (name.length < 3 || name.length > 25 ||  isNaN(num) || num < 0 || unit.length < 1 || unit === "" || unit.length > 10 || tags.length > 35 )
      return false;

    let product  = new Product(name, num, unit, tags);
    productsMap.addProduct(product);
    setProducts(productsMap.getSortedArray());
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

    //productsMap.moveProductToIndex(Number(draggableId), destination.index);
    productsMap.moveProductByID(Number(draggableId), Number(newID));
    setProducts(productsMap.getSortedArray());

  }

  const handleChange = (change: DatasetChangeHandleProps): boolean => {
    const { id, action, number } = change;
    let { value } = change;
    value = value || "";
  

    const product = productsMap.getByID(id);


    let isValidChange = false;
  
    if (product) {
      switch (action) {
        case ActionType.delete:
          productsMap.removeByID(id);
          isValidChange = true;
          break;
        case ActionType.updateName:
          if (value.length > 2 && value.length < 26)
          {
            product.Name = value;
            isValidChange = true;
          }
          break;
        case ActionType.updateNumber:
          const num = Number(value);
          console.log(value); 
          if (!isNaN(num) && num >= 0) 
          {
            product.Number = num;
            isValidChange = true;
          }
          break;
        case ActionType.updateUnit:
          if (value.length > 0 && value !== "" && value.length < 11) 
          {
            product.Unit = value;
            isValidChange = true;
          }
          break;
        case ActionType.updateTags:
          if (value.length < 35) 
          {
            product.Tags = value;
            isValidChange = true;
          }
          break;
        case ActionType.clear:
          product.Number = 0;
          isValidChange = true;
          break;
        case ActionType.increment:
          product.Number++;
          isValidChange = true;
          break;
        case ActionType.decrement:
          product.Number = product.Number >= 1 ? product.Number - 1 : 0;
          isValidChange = true;
          break;
        case ActionType.move:
          productsMap.moveProductToIndex(product.ID, Number(value));
          throw new Error("Check value if is valid index");
          break;
        case ActionType.applyTNumber:
          if(number)
          {
            product.Number += product.tNumber;
            product.tNumber = 0;
            const recipe = RecipeMap.getInstance().getByID(number);
            if(recipe)
              recipe.number = 0;
          }
          else
            RecipeMap.getInstance().applyTNumber();
            RecipeMap.getInstance().save();
          isValidChange = true;
          break;
        default:
          break;
      }
      if(isValidChange)
        productsMap.save();
        setProducts(productsMap.getSortedArray());
    }

    return isValidChange;
  };


  const getComponents = (): JSX.Element[] =>
  {
    const components: JSX.Element[] = [];

    products.forEach((item, index) =>
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
            <ProductLine data={item} handleChange={handleChange} applied={false}/>
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
      productsMap.flatline();
      RecipeMap.getInstance().flatline();
      productsMap.save();
      RecipeMap.getInstance().save();
      setProducts(productsMap.getSortedArray());
    }
  }

  return (
    <div>
      <div className="flex flex-row justify-between border-2 border-groove mb-1 rounded-md">
          <SearchBar onSearch={handleSearch} styles = "w-full bg-slate-300 rounded-r-xl rounded-l-sm"/>
          <button type="button" onClick={resetList} className="h-8 w-8 text-red-500 m-2" aria-hidden="true" >
            <NoSymbolIcon className="w-full h-full"/>
          </button>
          <button type="button" className="h-8 w-8 text-blue-500 m-2" aria-hidden="true">
            <ClipboardDocumentListIcon className="w-full h-full" onClick={()=> productsMap.copyProducts()}/>
          </button>
      </div>
      <AddProductBar onAdd={handleAdd}/>
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

export default ProductsTab;
