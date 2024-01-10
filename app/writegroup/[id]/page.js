import { connectDB } from "@/util/database"
import '../../styles/question/question.scss'
import { ObjectId } from "mongodb"
import BestQaGroup from "./bestQaGroup"
import Image from "next/image"

export default async function BestQaWrite(props){
    let paramsid = new ObjectId(props.params.id)
    const client = await connectDB
    const db = client.db('forum')
    let result = await db.collection('best_product').findOne({_id : new ObjectId(paramsid)})
    return (
        <div className="bestQa">
            <h3>상품 문의사항</h3>
            <div className="bestQaProduct">
                <Image src={result.imageUrl} alt={result.reference} width={90} height={90}/>
                <div>
                    <h4>{result.koreanTitle}</h4>
                    <h4>{result.title}</h4>
                </div>
            </div>
            <form action='/api/bestqa/test' method="POST">
                <BestQaGroup/>
                <input type="hidden" name='productid' value={new ObjectId(paramsid).toString()} />
            </form>
        </div>
    )
}