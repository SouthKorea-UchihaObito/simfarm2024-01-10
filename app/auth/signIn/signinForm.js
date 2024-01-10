'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from "react"
import styles from '../../styles/api/signin.module.scss'
import { signIn } from 'next-auth/react'
export default function SignInForm({result}){
    const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        const result = await signIn("email-password-credential", {
            email,
            password,
            redirect: true,
            callbackUrl: "/"
        });
    }
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [eamilValid, setEmailValid] = useState(false)
    const [pwValid, setPwValid] = useState(false)
    const [notAllow, setNotAllow] = useState(true)
    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if(regex.test(e.target.value)){
            setEmailValid(true)
        } else {
            setEmailValid(false)
        }
    }
    const handlePassword = (e) => {
        setPw(e.target.value);
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/g
        if(regex.test(e.target.value)){
            setPwValid(true)
        } else {
            setPwValid(false)
        }
    }
    useEffect(()=>{
        if(eamilValid && pwValid){
           setNotAllow(false)
           return
        } 
        setNotAllow(true)
    }, [eamilValid, pwValid])
    return(
        <form onSubmit={onSubmit}>
            <div className={styles.emailBox}>
                <label htmlFor='email'>이메일</label>
                <input id='email' className={styles.textInput} name='email' value={email} type='email' required placeholder="이메일을 입력하세요."
                onChange={handleEmail}/>
            </div>
            <p className={styles.errText}>
                {!eamilValid && email.length > 0 &&(
                    <span style={{color:'red'}}>올바른 이메일을 입력해주세요.</span>
                )}
            </p>
            <div className={styles.pwBox}>
                <label htmlFor='password'>비밀번호</label>
                <input id='password' className={styles.textInput} name='password' value={pw} type='password' required placeholder="비밀번호를 입력하세요."
                onChange={handlePassword}
                />
            </div>
            <p className={styles.errText}>
                {!pwValid && pw.length > 0 && (
                    <span style={{color:'red'}}>영문, 숫자, 특수문자 포함 최소 8자 이상 입력해주세요.</span>
                )}
            </p>
            <div className={styles.checks}>
                <div className={styles.checkZone}>
                    <input id='isSave' className='checkbox' type='checkbox'/>
                    <label className='checkbox' htmlFor='isSave'><i/>아이디 저장</label>
                    <input id='autoLogin' className='checkbox' type='checkbox'/>
                    <label className='checkbox' htmlFor='autoLogin'><i/>자동 로그인</label>
                </div>
                <div className={styles.signLinkZone}>
                    <Link href='/idsr'>아이디 찾기</Link>
                    <Link href='/auth/signup'>회원가입</Link>
                </div>
            </div>
            <button disabled={notAllow} className={styles.loginBtn} type='submit'>로그인</button>
            <Link className={styles.signupBtn} href='/auth/agreement'>회원가입</Link>
        </form>
    )
}