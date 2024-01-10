'use client'
import {signIn} from 'next-auth/react'
export default function LoginBtn(){
    // useEffect(()=>{
    //     if(typeof window != 'undefined'){ 
    //         // Next.js에서 localStorage 사용법
    //         // 현재 위치가 브라우저 인지 서버인지 확인해주는 코드
    //         localStorage.setItem('모드', 'dack')
    //     }
    // }, [])
    return(
        <button className='login' onClick={()=>{
            signIn()
        }} title='https://icons8.kr/icon/mVo7XYRsVjnm/%EC%9E%A0%EA%B8%88-%ED%95%B4%EC%A0%9C'>로그인</button>
    )
}
