import { connectDB } from "@/util/database"
import { MongoClient } from "mongodb"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import styles from '../styles/api/write.module.scss'
import failure from '/public/image/signup/failure.svg'
import Image from "next/image"
import LoginBtn from "./LoginBtn"
import FormZone from "./formZone"
export default async function Write(){
    let session = await getServerSession(authOptions)
    if(session){
        return(
            <main className={styles.write}>
                <h4>글작성</h4>
                <FormZone/>
            </main>
        )
    } else {
        return(
            <main className={styles.notWrite}>
                <Image src={failure} alt='signupCompletePoto' width={200}  title='https://pixabay.com/ko/users/janjf93-3084263/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1976099'/>
                <p>글작성 권한이 없습니다.</p>
                <LoginBtn/>
            </main>
        )
    }
}