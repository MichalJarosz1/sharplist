import { NextResponse } from 'next/server'
import { sql } from "@vercel/postgres";

export async function GET(request: Request, context: { params: any }) 
{
    const hash = context.params.id;
    
    if (!hash)
    {
        console.error("Slug cannot be accessed!");
        return new Response("Wystąpił błąd podczas odczytu klucza", {status: 500})
    }

    const resultProducts = await sql`
    SELECT raw_data
    FROM product_list_list
    WHERE unique_id = ${hash}
    `;

    const resultRecipies = await sql`
    SELECT raw_data
    FROM recipe_list_list
    WHERE unique_id = ${hash}
    `;

    console.log(resultProducts,resultRecipies);

    const product_list_list = resultProducts.rows[0]?.raw_data;
    const recipe_list_list = resultRecipies.rows[0]?.raw_data;

    if(!product_list_list || !recipe_list_list)
    {
        console.error("product_list_list or recipe_list_list undefined");
        console.error("Showing Products: ", resultProducts);

        return new Response("Wystąpił błąd z zapytanie do bazy danych", {status: 500})

    }
    
    const response = { product_list_list, recipe_list_list };

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
}