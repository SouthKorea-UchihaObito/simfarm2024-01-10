import { connectDB } from "@/util/database"
import { MongoClient } from "mongodb"
import { getServerSession } from 'next-auth'
import { authOptions } from "../auth/[...nextauth]"
export default async function handler(req, res){
    let session = await getServerSession(req, res, authOptions) // server 안에서 쓸려면 이렇게!
    if(session){ // 로그인 안하면 이 변수는 비어있을것이다.
        req.body.author = session.user.email // 
    }
    if(req.method === "POST"){
        if(req.body.title == ''){
            return res.status(400).json('제목 빈칸')
        } else if(req.body.content == ''){
            return res.status(400).json('내용 빈칸')
        } else if(req.body.title !== '' && !req.body.content !== ''){
            if(session){
                try {
                    const client = await connectDB
                    const db = client.db('forum')
                    let save = {
                        name : session.user.name,
                        author : req.body.author,
                        title : req.body.title,
                        content : req.body.content,
                        imageUrl : req.body.resultUrl,
                        likeUser : [],
                        postLikeCount : 0
                    }
                    await db.collection('post').insertOne(save)
                    return res.status(200).redirect(302, '/list')
                } catch (error) {
                    return res.status(500).json('전송 실패')
                }
            } else {
                return res.status(400).json('권한이 없습니다.')
            }
        }
    } else if (req.method === "GET"){
        return res.status(200).json('GET 방식으로 전송되었습니다.')
    }
}