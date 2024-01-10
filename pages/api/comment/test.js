import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
export default async function handler(req, res){
    if(req.method === 'GET'){
        console.log(req.query.id)
        const client = await connectDB
        const db = client.db('forum')
        let result = await db.collection('comment').find({parent : new ObjectId(req.query.id)}).toArray() // 모든 댓글 중에 유저가 보낸 게시물 _id 가진거 찾아옴
        return res.status(200).json(result)
    }
}