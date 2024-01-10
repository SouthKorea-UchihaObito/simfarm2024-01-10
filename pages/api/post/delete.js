import { connectDB } from "@/util/database"
import { MongoClient, ObjectId } from "mongodb"
import { getServerSession } from 'next-auth'
import { authOptions } from "../auth/[...nextauth]"
export default async function handler(req, res){
    const client = await connectDB
    const db = client.db('forum')
    let session = await getServerSession (req, res, authOptions) // server 안에서 쓸려면 이렇게!
    let listSearch = await db.collection('post').findOne({_id : new ObjectId(req.body)})
    if(req.method === "POST"){
        if(session){
            if(session.user.email === listSearch.author){ // session 의 email와 찾은 id의 author이 일치한다면
                try {
                    await db.collection('post').deleteOne({_id : new ObjectId(listSearch._id)})
                    return res.status(200).json('삭제완료')
                } catch(error) {
                    return res.status(500).json('삭제실패')
                }
            } else if(session.user.role === 'admin'){
                try {
                    await db.collection('post').deleteOne({_id : new ObjectId(listSearch._id)})
                    return res.status(200).json('삭제완료')
                } catch(error) {
                    return res.status(500).json('삭제실패')
                }
            } else if(session.user.email !== listSearch.author) { // session 의 email와 찾은 id의 author이 일치하지 않는다면
                return res.status(400).json('권한이 없습니다.')
            } 
        } else {
            return res.status(400).json('권한이 없습니다.')
        }
    }
}