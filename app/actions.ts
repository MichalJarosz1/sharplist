"use server";

import { sql } from "@vercel/postgres";

export async function createShareOLD(formData: FormData) {
  console.log(formData);
  const product_list_list_raw = formData.get("product_list_list")?.toString();
  const recipe_list_list_raw = formData.get("recipe_list_list")?.toString();

  if(!product_list_list_raw || !recipe_list_list_raw) return;

/*
  const {rows} = await sql`
  INSERT INTO carts (User_id) 
  VALUES (1010)
  `;
*/
  //redirect(`/products/}`);

  await sql`
  INSERT INTO product_list_list (raw_data)
  VALUES (${product_list_list_raw});
  `;

  await sql`
  INSERT INTO recipe_list_list (raw_data)
  VALUES (${recipe_list_list_raw});
  `;
}

export async function createShare(formData: FormData) {
  console.log(formData);
  const product_list_list_raw = formData.get("product_list_list")?.toString();
  const recipe_list_list_raw = formData.get("recipe_list_list")?.toString();
  const uniqueKey =  formData.get("hash")?.toString();

  if(!product_list_list_raw || !recipe_list_list_raw || !uniqueKey) return;



  await sql`
  INSERT INTO product_list_list (unique_id, raw_data)
  VALUES (${uniqueKey}, ${product_list_list_raw});
  `;

  await sql`
  INSERT INTO recipe_list_list (unique_id, raw_data)
  VALUES (${uniqueKey}, ${recipe_list_list_raw});
  `;
}

export async function loadFromHash(formData: FormData) 
{
  const uniqueKey =  formData.get("hash")?.toString();

  

}

