import { getServerSession } from 'next-auth'
import styles from '../../styles/api/signup.module.scss'
import Form from './form'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import OnSession from '@/app/components/onSession/page'
export default async function Signup(){
    let session = await getServerSession(authOptions)
    if(!session){
        return(
            <main className={styles.signup}>
                <h4>회원가입</h4>
                <div className={styles.step}>
                    <span>약관동의</span>
                    <span className={styles.on}>정보입력</span>
                    <span>가입완료</span>
                </div>
                <div className={styles.consentComment}>
                    <p><strong>정보입력</strong> 회원가입에 필요한 정보를 입력합니다.</p>
                    <p><span>▣</span>는 필수 입력 항목</p>
                </div>
                <Form/>
            </main>
        )
    } else {
        return(
            <OnSession/>
        )
    }
}
