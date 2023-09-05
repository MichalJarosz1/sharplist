import { sql } from "@vercel/postgres";

const page = async () => {

    //const info = await sql`PRAGMA table_info(recipe_list_list)`;

    return (
      <div>{JSON.stringify("")}</div>
    )
}

export default page;