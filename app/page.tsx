"use client"
import { Footer, MainPlaceholder, NavBar, ScrollToTopButton } from "@/components";
import { LStorage } from "@/utils/LStorage";
import { ProductMap } from "@/utils/Product";
import { RecipeMap } from "@/utils/Recipe";
import dynamic from "next/dynamic";
import { useState } from "react";

const ProductsTab = dynamic(() => import("@/components/ProductsTab"), { ssr: false });
const RecipiesTab = dynamic(() => import("@/components/RecipiesTab"), { ssr: false });


if (typeof window !== 'undefined') 
{
  const LSHandle = LStorage.getInstance();
  LSHandle.addSavables(ProductMap.getInstance());
  LSHandle.addSavables(RecipeMap.getInstance());
  LSHandle.loadIfPossible();
}

export default function Page() 
{
  const [tab, setTab] = useState("");
  const [Switch, setSwitch] = useState(true);

  const handleTabChange = (NavTab: string): void =>
  {
    setTab(NavTab);
    setSwitch(!Switch);
  }

  return (
      <main className="md:m-2">
        <NavBar handleTabChange={handleTabChange}/>
        {
          tab === "" && <MainPlaceholder/> ||
          tab === "Products" && <ProductsTab/> ||
          tab === "Recipies" && <RecipiesTab tab={Switch} />
        }
        <Footer/>
        <ScrollToTopButton/>
      </main>
  );
}
