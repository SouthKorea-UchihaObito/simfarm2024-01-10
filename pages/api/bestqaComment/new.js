import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { ObjectId } from "mongodb"
export default async function handler(req, res){
    let session = await getServerSession(req, res, authOptions)
    if(req.method === "POST"){
        const client = await connectDB
        const db = client.db('forum')
        req.body = JSON.parse(req.body)
        const today = new Date()
        const year = today.getFullYear() // 년도
        const month = today.getMonth() + 1// 월
        const date = today.getDate() // 날짜
        const day = today.getDay() // 요일
        const hours = today.getHours() // 시
        const minutes = today.getMinutes() // 분
        const getSeconds = today.getSeconds() // 초
        let dateresult = year + '년 ' + month + '월 ' + date + '일 ' + minutes + ':' + getSeconds
        let save = {
            content : req.body.comment,
            parent : new ObjectId(req.body._id),
            name : session.user.name,
            author : session.user.email,
            date : dateresult
        }
        if(req.body.comment !== ''){
            if(session){
                if(session.user.role === 'admin'){
                    try {
                        let result = await db.collection('bestqacomment').insertOne(save)
                        let commentList = await db.collection('bestqacomment').find({parent: new ObjectId(req.body._id)}).toArray()
                        return res.status(200).json(commentList)
                    } catch {
                        return res.status(400).json('실패')
                    }
                } else {
                    return res.status(500).json('빈칸')
                }
            }
        } else {
            return res.status(400).json('빈칸')
        }
    }
}