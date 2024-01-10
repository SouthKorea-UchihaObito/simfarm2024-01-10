import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { ObjectId } from "mongodb"
export default async function handler(req, res){
    if(req.method === "POST"){ // method 를 POST로 전송했다면
        const client = await connectDB
        const db = client.db('forum')
        let session = await getServerSession(req, res, authOptions)
        if(session){ // 세션이 있으면
            req.body = JSON.parse(req.body)
            if(req.body.comment === '' || req.body._id === ''){ // 댓글 입력칸이 빈칸 혹은 작성 게시글의 id가 비어있지 않다면
                return res.status(400).json('빈칸')
            } else {
                let save = {
                    content : req.body.comment,
                    parent : new ObjectId(req.body._id),
                    author : session.user.email,
                    author_name : session.user.name
                }
                try {
                    await db.collection('comment').insertOne(save)
                    let dataText = await db.collection('comment').find({parent : new ObjectId(req.body._id)}).toArray()
                    console.log(req.body._id)
                    return res.status(200).json(dataText)
                } catch {
                    return res.status(500).json('실패')
                }
            }
        } else {
            return res.status(400).json('권한이 없습니다.')
        }
    } else {
        return res.status(400).json('실패')
    }
}