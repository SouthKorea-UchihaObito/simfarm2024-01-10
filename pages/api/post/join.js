import { connectDB } from "@/util/database"
import { MongoClient } from "mongodb"
export default async function handler(요청, 응답){
    if(요청.method === "POST"){
        if(요청.body.id == ''){
            return 응답.status(500).json('제목 빈칸')
        } else if(요청.body.password == ''){
            return 응답.status(500).json('내용 빈칸')
        } else if(!요청.body.id == '' && !요청.body.password == ''){
            const client = await connectDB
            const db = client.db('forum')
            let result1 = await db.collection('user_cred').find().toArray()
            for(let i = 0; i < result1.length; i++){
                if(result1[i].name !== 요청.body.id){
                   try {
                        let result2 = await db.collection('user_cred').insertOne(요청.body)
                        return 응답.status(200).json('전송완료')
                    } catch (error) {
                        return 응답.status(500).json('전송 실패')
                    }
                } else {
                    return 응답.status(400).json('가입실패')
                }
                break
            }
            return 응답.status(200).json(result1)   
        }
    } else if (요창.method === "GET"){
        return 응답.status(200).json('GET 방식으로 전송되었습니다.')
    }
}