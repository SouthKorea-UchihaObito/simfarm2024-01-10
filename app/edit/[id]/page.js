import { connectDB } from "@/util/database"
import { MongoClient, ObjectId } from "mongodb"
export default async function Edit(props){
    const client = await connectDB
    const db = client.db('forum')
    let result = await db.collection('post').findOne({ _id : new ObjectId(props.params.id)})
    // await db.collection('post').updateOne({수정할게시물정보}, {$set : {수정할 내용 }})
    return(
        <div>
            <h4>수정페이지</h4>
            <form action="/api/post/edit" method="POST">
                <input type="hidden" name='_id' defaultValue={result._id.toString()}></input>
                <div>
                    <label>글 제목</label>
                    <input id="title" type="text" name="title" defaultValue={result.title}/>
                </div>
                <div>
                    <label>글 내용</label>
                    <input id="content" type="text" name="content" defaultValue={result.content}/>
                </div>
                <button type="submit">전송</button>
            </form>
        </div>
    )
}