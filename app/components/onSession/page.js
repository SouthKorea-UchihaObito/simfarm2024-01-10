import Image from 'next/image'
import OnSessionImage from '/public/image/error.svg'
import LogOutBtn from '@/app/LogOutBtn'
export default function OnSession(){
    return(
        <main className='onSession'>
            <Image src={OnSessionImage} alt="text" width={50} title="https://pixabay.com/ko/users/kropekk_pl-114936/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=350170"/>
            <p>접근 권한이 없습니다.<br/>로그아웃 후 이용하시기 바랍니다.</p>
            <LogOutBtn/>
        </main>
    )
}