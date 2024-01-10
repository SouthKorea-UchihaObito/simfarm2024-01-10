'use client'
import { useSearchParams } from 'next/navigation'
import { signIn } from "next-auth/react"
import kakaoIco from '/public/image/signin/kakao.png'
import Image from 'next/image'
import styles from '../../styles/api/signin.module.scss'
export default function KakaoSignInButton(){
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
    return(
        <button className={styles.kakaoLoginBtn} onClick={() => signIn('kakao', { callbackUrl })}>
            <Image src={kakaoIco} alt='카카오톡 로그인 아이콘 이미지'/> 카카오톡으로 로그인하기
        </button>
    )
}