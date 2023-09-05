"use client"

import { LStorage } from "@/utils/LStorage";
import { ProductMap } from "@/utils/Product";
import { RecipeMap } from "@/utils/Recipe";
import { useRouter } from "next/navigation";

function SharePage({ params }: { params: { id: string } }) 
{
  const router = useRouter();

  const LoadSettingsFromHash = async () => 
  {
    const response = await fetch(`/api/share/${params.id}`, 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
    );

    if (!response.ok) {
      // Obsługa błędów, np. wyrzucenie wyjątku lub inne działania
      throw new Error("Network response was not ok");
    }

    // Parsowanie odpowiedzi JSON
    const responseData = await response.json();
    
    // Teraz możesz używać danych z odpowiedzi
    //console.log(responseData);

    //console.log("Share/id: LStorage: ", LStorage.getInstance());

    //console.log(responseData.product_list_list);
    //console.log(responseData.recipe_list_list);

    let LSHandle: LStorage;

    if (typeof window !== 'undefined') 
    {
      LSHandle = LStorage.getInstance();
      LSHandle.addSavables(ProductMap.getInstance());
      LSHandle.addSavables(RecipeMap.getInstance());
      
      console.log(LSHandle);
      
      localStorage.setItem("product_list_list", responseData.product_list_list);
      localStorage.setItem("recipe_list_list", responseData.recipe_list_list);
      localStorage.setItem("isSet", "true");
      LSHandle.loadIfPossible();

      router.push('/');
    }

  }

  return (
    <>
      <p>Hash: {params.id}</p>
        <button
          className="custom-btn border-4 rounded-xl border-teal-500 border-opacity-10 bg-teal-300 bg-opacity-20 hover:bg-opacity-40 hover:text-white"
          type="submit" onClick={LoadSettingsFromHash}
        >
          Load New Settings
        </button>
    </>
  );
}

export default SharePage;