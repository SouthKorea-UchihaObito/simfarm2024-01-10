import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { cookies } from 'next/headers'
import LogOutBtn from '../LogOutBtn'
import LoginBtn from '../LoginBtn'
import SearchZone from './header/searchZone'
import HaedRight from './header/headBott'
import HaedBott from './header/headBott'
export default async function Header(){
    let session = await getServerSession(authOptions)
    let result = cookies().get('name')
    console.log(result)
    return(
        <header>
            <div className='headBanner'><Link href="/">7월 한달간 배송비 무료!</Link></div>
            <div className='headFunList'>
                <nav>
                    <ul>
                        <li className='signinBtn'>{session ? <LogOutBtn title=''/> : <LoginBtn/>}</li>
                        {session ? null : <li className='signupBtn' title='https://icons8.kr/icon/87012/%EC%82%AC%EC%9A%A9%EC%9E%90-%EA%B7%B8%EB%A3%B9-%EB%82%A8%EC%9E%90-%EC%B6%94%EA%B0%80'><Link href="/auth/agreement">회원가입</Link></li>}
                        <li className='mypageBtn' title='https://icons8.kr/icon/15263/%EC%9B%90-%EC%82%AC%EC%9A%A9%EC%9E%90-%EB%82%A8%EC%84%B1'><Link href="/">마이쇼핑</Link></li> 
                        <li><Link href='/service/notice'>고객센터</Link></li>
                    </ul>
                </nav>
            </div>
            <HaedBott/>
        </header>
    )
}