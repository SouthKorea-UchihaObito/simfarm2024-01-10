import styles from '../../styles/api/joinfailure.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import failure from '/public/image/signup/failure.svg'
import LoginBtn from '@/app/LoginBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import OnSession from '@/app/components/onSession/page'

export default async function Joinfailure(){
    let session = await getServerSession(authOptions)
    if(!session){
        return(
            <main className={styles.joinfailure}>
                <h4>회원가입</h4>
                <div className={styles.step}>
                    <span>약관동의</span>
                    <span>정보입력</span>
                    <span className={styles.on}>가입완료</span>
                </div>
                <Image src={failure} alt='signupCompletePoto' width={200}  title='https://pixabay.com/ko/users/janjf93-3084263/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1976099'/>
                <div className={styles.completeText}>
                    <p>회원가입에 실패하였습니다.</p>
                    <p>
                        이메일을 중복 여부 또는<br/>
                        정보 입력란을 올바르게 입력하였는지,<br/>다시 확인 하시기 바랍니다.
                    </p>
                </div>
                <Link href="/auth/agreement">회원가입</Link>
            </main>
        )
    } else {
        return(
            <OnSession/>
        )
    }
}