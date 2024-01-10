'use client'
import {signIn} from 'next-auth/react'
import styles from '../styles/api/write.module.scss'
export default function LoginBtn(){
    return(
        <button className={styles.loginBtn} onClick={()=>{
            signIn()
        }} title='https://icons8.kr/icon/mVo7XYRsVjnm/%EC%9E%A0%EA%B8%88-%ED%95%B4%EC%A0%9C'>로그인</button>
    )
}
