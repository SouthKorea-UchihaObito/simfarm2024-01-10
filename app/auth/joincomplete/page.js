import styles from '../../styles/api/joincomplete.module.scss'
import Image from 'next/image'
import complete from '/public/image/signup/complete.svg'
import LoginBtn from '@/app/LoginBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import OnSession from '@/app/components/onSession/page'
export default async function Joincomplete(){
    let session = await getServerSession(authOptions)
    if(!session){
        return(
            <main className={styles.joincomplete}>
                <h4>회원가입</h4>
                <div className={styles.step}>
                    <span>약관동의</span>
                    <span>정보입력</span>
                    <span className={styles.on}>가입완료</span>
                </div>
                <Image src={complete} alt='signupCompletePoto' width={200}  title='https://pixabay.com/ko/users/janjf93-3084263/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1976099'/>
                <div className={styles.completeText}>
                    <p>심팜팜 <strong>회원가입이 완료</strong>되었습니다.</p>
                    <p>심팜팜의 회원이 되신 걸 환영합니다.</p>
                </div>
                <LoginBtn/>
            </main>
        )
    } else {
        return(
            <OnSession/>
        )
    }
}