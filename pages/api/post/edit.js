import { connectDB } from "@/util/database"
import { MongoClient, ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
export default async function handler(req, res){
    const client = await connectDB
    const db = client.db('forum')
    let session = await getServerSession(req, res, authOptions)
    if(req.method === "POST"){
        if(session){
            let listSearch = await db.collection('post').findOne({_id : new ObjectId(req.body._id)})
            /*** ★★★ 관리자는 모든 글을 수정/삭제 가능하게 ★★★ ***/
            if(session.user.email === listSearch.author){ // 세션의 이메일과 찾은 계정의 이메일(author)이 서로 일치 하였을 때
                try {
                    let change = {title : req.body.title, content : req.body.content}
                    let result = await db.collection('post').updateOne({_id : new ObjectId(req.body._id)}, {$set : change})
                    return res.status(200).redirect(302,'/list')
                } catch (error) {
                    return 응답.status(500).json('실패')
                }
            } else if (session.user.role === 'admin'){
                try {
                    let change = {title : req.body.title, content : req.body.content}
                    let result = await db.collection('post').updateOne({_id : new ObjectId(req.body._id)}, {$set : change})
                    return res.status(200).redirect(302,'/list')
                } catch (error) {
                    return 응답.status(500).json('실패')
                }
            } else if (session.user.email !== listSearch.author){ // 세션의 이메일과 찾은 계정의 이메일(author)이 서로 일치 하지 않았을 때
                return res.status(400).json('권한이 없습니다.')
            }
        } else {
            return res.status(400).json('권한이 없습니다.')
        }
    }
}