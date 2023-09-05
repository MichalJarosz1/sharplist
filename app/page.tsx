"use client"
import { Footer, MainMenu, NavBar, ScrollToTopButton } from "@/components";
import { LStorage } from "@/utils/LStorage";
import { ProductMap } from "@/utils/Product";
import { RecipeMap } from "@/utils/Recipe";
import { createShare } from "./actions";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";


let LSHandle: LStorage;

if (typeof window !== 'undefined') 
{
  LSHandle = LStorage.getInstance();
  LSHandle.addSavables(ProductMap.getInstance());
  LSHandle.addSavables(RecipeMap.getInstance());
  LSHandle.loadIfPossible();

  console.log(LSHandle);
}

export default function Page() 
{
  const router = useRouter();

  router.push('/');

  const pathname = window.location.href;

  const handleShare = async () => {
    const formData = new FormData();

    const uniqueKey = uuidv4(); // Generowanie klucza UUID

    formData.append("hash", uniqueKey);

    LSHandle.savables.forEach(savable => {
      formData.append(savable.storageKey, JSON.stringify(savable.dumpData()));
      //console.log(savable.storageKey);
    });

    //createShare(formData);

    let sharableLink = `${pathname}share/${uniqueKey}`;

    sharableLink = sharableLink.replace("/Products", "/");
    sharableLink = sharableLink.replace("/Recipies", "/");

    console.log(sharableLink);

    navigator.clipboard.writeText(sharableLink).then(() => { alert(`Sharable link copied: \n(${sharableLink})`) }, () => { alert("coping failed") });
  }

  return (
      <main className="md:m-2 -z-40">
        <NavBar/>
        <MainMenu LSHandle={LSHandle} handleShare={handleShare}/>
        <Footer/>
        <ScrollToTopButton/>
      </main>
  );
}
