import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import '../../../styles/product/product.scss'
import Image from "next/image"
import ProductImage from "./productImage"
import HintZone from "./hintiZone"
import ProductFoot from "./productFoot"
export default async function BestDetail(props){
    const client = await connectDB
    const db = client.db('forum')
    let result = await db.collection('best_product').findOne({ _id : new ObjectId(props.params.id)})
    let productTabQa = await db.collection('product_qa').find({productid : new ObjectId(props.params.id)}).toArray()
    let productTabQaOne = await db.collection('product_qa').findOne({productid : new ObjectId(props.params.id)})
    const converPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    return(
        <main className="product">
            <div className="productCenter">
                <ProductImage _id={result._id} resultImage={result.imageUrl} reference={result.reference}/>
                <div className="productInfo">
                    <h4 className="productEsTitle">{result.title}</h4>
                    <h4 className="productKrTitle">{result.koreanTitle}</h4>
                    <p className="productContent">{result.productContent}</p>
                    <p className="productPrice"><strong>{converPrice(result.price)}</strong> 원</p>
                    <p className="deliveryPrice">배송비 <span>3,000원(30,000원 이상 구매 시 무료)</span></p>
                    <p className="MileagePrice">적립금 <span>2%</span></p>   
                    <HintZone result={result} title={result.title} koreanTitle={result.koreanTitle}  price={result.price} size={result.size}/>
                </div>
            </div>
            <ProductFoot result={result} productTabQa={productTabQa}/>
        </main>
    )
}