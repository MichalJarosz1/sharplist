import { sql } from '@vercel/postgres'
import React from 'react'


const page = async () => {
    
    const rows = await sql`SELECT * FROM product_list_list;
    `;

    return (
    <div>
        {JSON.stringify(rows)}
    </div>
    )
}

export default page