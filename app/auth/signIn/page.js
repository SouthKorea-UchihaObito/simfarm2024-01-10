
import Image from 'next/image'
import signinRight from '/public/image/signin/signinRight.png'
import failure from '/public/image/signup/failure.svg'
import styles from '../../styles/api/signin.module.scss'
import SignInForm from './signinForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import KakaoSignInButton from './kakaoSignInButton'
import Link from 'next/link'
export default async function Signin() {
    let session = await getServerSession(authOptions)
    if(!session){
        return (
            <main className={styles.signin}>
                <div className={styles.formBox}>
                    <h2>회원 로그인</h2>
                    <SignInForm result={session}/>
                    <KakaoSignInButton />
                </div>
                <div className={styles.signinRight} title='https://unsplash.com/@0xhjohnson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'></div>
            </main>
        )
    } else {
        return(
            <main className={styles.notSignin}>
                <Image src={failure} alt='signupCompletePoto' width={200} title='https://pixabay.com/ko/users/janjf93-3084263/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1976099'/>
                <p>잘못된 접근입니다.</p>
                <Link href={'/'}>홈으로 이동</Link>
            </main>
        )
    }
    
}