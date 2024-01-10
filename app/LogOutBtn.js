'use client'
import {signOut} from 'next-auth/react'
export default function LogOutBtn(){
    return(
        <button className='logout' onClick={()=>{
            signOut()
        }} title='https://icons8.com/icon/vGj0AluRnTSa/%EC%B6%9C%EA%B5%AC'>로그아웃</button>
    )
}