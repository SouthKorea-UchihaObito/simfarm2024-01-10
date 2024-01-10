import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
export default async function handler(req, res){
    if(req.method === 'GET'){
        let session = await getServerSession(req, res, authOptions)
        const client = await connectDB
        const db = client.db('forum')
        let ser = await db.collection('post').findOne({_id : new ObjectId(req.query.id)}) // 모든 댓글 중에 유저가 보낸 게시물 _id 가진거 찾아옴
        let whether = null
        let love = null
        if(session){
            if(ser.likeUser.includes(session.user.email)){
                whether = true
                love = '❤️'
            } else {
                whether = false
                love = '🤍'
            }
            return res.status(200).json([whether, love])
        }
    }
}