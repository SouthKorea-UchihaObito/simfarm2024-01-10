import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import '../../../styles/detail/detail.scss'
import Image from "next/image"
import QaComment from "./QaComment"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
export default async function BestQaDetail(props) {
    const client = await connectDB
    const db = client.db('forum')
    let result = await db.collection('product_qa').findOne({_id : new ObjectId(props.params.id)})
    let produtImage = await db.collection('best_product').findOne({_id : new ObjectId(result.productid)})
    let session = await getServerSession(authOptions)
    return (
        <div className="productDetail">
            <div className="productDetailHead">
                <div className="productDetailHleft">
                    <Image src={produtImage.imageUrl} width={100} height={100} alt={produtImage.reference}/>
                    <div>
                        <h5>{produtImage.koreanTitle}</h5>
                        <h5>{produtImage.title}</h5>
                    </div>
                </div>
                <span>{result.date}</span>
            </div>
            <div className="productDetailContent">
                <p>{result.title}</p>
                <p>{result.content}</p>
            </div>
            <QaComment _id={result._id.toString()} session={session}/>
        </div>
    )
}