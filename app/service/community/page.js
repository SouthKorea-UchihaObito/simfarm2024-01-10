import { connectDB } from "@/util/database"
import { MongoClient } from "mongodb"
import Link from "next/link"
import DetailLink from "./DetailLink"
import ListItem from "./ListItem"
import ServiceNavGnb from "../serviceNavGnb/page"
import '../../styles/service/service.scss'
export const dynamic = 'force-dynamic' // dynamic rendering 으로 바꾸려면
// export const dynamic = 'force-static' // dynamic static 으로 바꾸려면
// 서버 절약 캐싱 기능 !
// 캐싱 : 결과를 잠깐 저장해두고 재사용
export default async function Community(){
    const client = await connectDB
    // const db = (await connectDB).db("forum")
    const db = client.db('forum')
    let result = await db.collection('post').find().toArray()
    return(
        <main className="community">
            <div className="communityCenter">
                <ServiceNavGnb/>
                <div className="communityRgiht">
                    <h3 className="communityNamed">커뮤니티</h3>
                    <ListItem result={result}/>
                    <div className="writeLink">
                        <Link href={'/write'}>글작성</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}