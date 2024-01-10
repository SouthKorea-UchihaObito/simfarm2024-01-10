import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb"
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt'
export default async function handler(req, res){
    if(req.method == "POST"){
        let hash = await bcrypt.hash(req.body.password, 10) // pw 암호화
        req.body.password = hash
        const client = await connectDB
        const db = client.db('forum')
        let searchEmail = await db.collection('user_cred').find().toArray()
        let searchEnd = null
        // for(let i = 0; i < searchEmail.length; i++){ // 반복문 이메일 중복 여부 체크

        //     if(searchEmail[i].email === req.body.email){
        //         searchEnd = false // 중복있음
        //     } else {
        //         searchEnd = true // 중복없음
        //     }
        //     break;
        // }
        searchEmail.filter((item, index, array)=>{
            console.log(item.email === req.body.email)
            if(item.email === req.body.email){
                searchEnd = false // 중복있음
                console.log('중복있음')
                return
            } else {
                searchEnd = true // 중복없음
                console.log('중복없음')
                return
            }
        })
        if(req.body.name === '' && req.body.email === '' || req.body.password === ''){ // 입력칸에 빈칸이 있다면
            return res.status(200).redirect(302, '/auth/joinfailure')
        } else if(searchEnd === false){ // 이메일이 중복이라면
            return res.status(200).redirect(302, '/auth/joinfailure')
        } else { // 빈칸도 없고 이메일이 중복되지 않는다면 가입 성공
            try{
                const client = await connectDB
                const db = client.db('forum')
                let result = await db.collection("user_cred").insertOne({_id : new ObjectId(req.body._id), id : req.body.id, email : req.body.email, name : req.body.name, password : req.body.password, postcode : req.body.postcode, address : req.body.address, detailAddress : req.body.detailAddress, tel : req.body.tel, year : req.body.year, role : "normal"});
                return res.status(200).redirect(302, '/auth/joincomplete')
            } catch {
                return res.status(200).redirect(302, '/auth/joinfailure')
            }
        } 
    }
}