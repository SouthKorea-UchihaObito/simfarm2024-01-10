import { connectDB } from "@/util/database"
import { MongoClient, ObjectId } from "mongodb"
import '../../styles/detail/detail.scss'
import Comment from './Comment'
import PostLike from './PostLike'
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { notFound } from "next/navigation"
import Image from "next/image"
export default async function Detail(props){
    const client = await connectDB
    const db = client.db('forum')
    let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)})
    let session = await getServerSession(authOptions)
    if(result === null){
        return notFound() // 404 페이지 보여주고 싶을 때
    } else if(result !== null){
        return(
            <div className="detail">
                <div className="detailHead">
                    <div className="detailHleft">
                        <Image src={result.imageUrl} alt="업로드 이미지" width={100} height={100}/>
                        <h4>{result.title}</h4>
                    </div>
                    <span>2022-10-30</span>
                </div>
                <div className="detailContent">
                    <p>{result.content}</p>
                    {result.imageUrl ? <Image src={result.imageUrl} alt="업로드 이미지" width={400} height={300}/> : null} 
                </div>
                <div className="detailUserZone">
                    <span>작성자 {result.name} - {result.author}</span>
                    <PostLike result={result} name={result.name} _id={result._id} likeUser={result.likeUser} postLikeCount={result.postLikeCount} session={session} />
                </div>
                <Comment _id={result._id} />
                
            </div>
        )
    }
}