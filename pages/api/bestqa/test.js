import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
export default async function handler(req, res) {
    const today = new Date()
    const year = today.getFullYear() // 년도
    const month = today.getMonth() + 1// 월
    const date = today.getDate() // 날짜
    const day = today.getDay() // 요일
    const hours = today.getHours() // 시
    const minutes = today.getMinutes() // 분
    let dateresult = year + '년 ' + month + '월 ' + date + '일'
    let session = await getServerSession(req, res, authOptions)
    console.log(session.user.email)
    if(req.method === 'POST'){
        if(!session){
            return res.status(400).json('권한이 없습니다.')
        } else {
            const client = await connectDB
            const db = client.db('forum')
    
            let save = {
                title: req.body.bestqaTitle,
                content: req.body.bestqaContent,
                author : session.user.email,
                date: dateresult,
                productid: new ObjectId(req.body.productid)
            }
            // let result = await db.collection('best_product').insertOne(save)
            // 상품의 id를 검색 대안 2 상품의 배열에 리뷰를
            // let search = await db.collection('best_product').findOne({_id : new ObjectId(req.body.productid)})
            let result = await db.collection('product_qa').insertOne(save)
            return res.status(200).redirect(302, '/detailgroup/bestdetail/' + [save.productid])
        }
        
    } else {
        return res.status(500).json('잘못된 접근')
    }
    // 서버기능 처리 성공시 200
    // 서버기능 처리 실패시 500
    // 서버기능 처리 실패시(유저의 잘못) 400
}