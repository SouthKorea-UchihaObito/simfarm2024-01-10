'use client'
import Image from 'next/image'
import errorImage from '/public/image/error.svg'
export default function Error({error, reset}){ // 무조건 use client / props 작명가능 error , reset
    // 일부분만 error.js 로 바꿔줌
    // error.js 는 옆에 있는 layout.js 에러를 체크 못한다
    // error.js 옆에 없으면 상위폴더들 뒤짐 그냥 app 폴더에 만들어도됨
    return (
        <main className="error">
            <Image src={errorImage} width={70} alt='errorImage' title='https://pixabay.com/ko/users/kropekk_pl-114936/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=350198'/>
            <p>에러가 발생하였습니다.</p>
            <button onClick={()=>{reset()}}>리로드</button>
        </main>
    )
}