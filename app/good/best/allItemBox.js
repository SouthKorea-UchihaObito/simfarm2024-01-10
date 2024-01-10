import { connectDB } from "@/util/database"
import Link from "next/link"
import BestDetailLink from "./bestDetailLink"
import AllItemGroup from "./allItemGroup";
import Image from "next/image"
export default async function AllItemBox(){
    const client = await connectDB
    const db = client.db('forum') 
    let result = await db.collection('best_product').find().toArray()
    return(
        <div className="allItemBox">
            <AllItemGroup result={result} />
        </div>
    )
}