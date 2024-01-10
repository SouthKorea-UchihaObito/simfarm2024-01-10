import Image from 'next/image'
import loadingImage from '/public/image/loading.gif'
export default function Loading(){
    return ( // 모든 곳에 생성 가능
        // loading.js 옆에 없으면 상위폴더들 뒤짐 그냥 app 폴더에 만들어도됨 모든 페이지들이 사용가능
        <main className='loading'>
            <Image src={loadingImage} alt='loadingImage' title='https://pixabay.com/ko/users/felipedsilva-18482044/?utm_source=link-attribution&utm_medium=referral&utm_campaign=animation&utm_content=7528'/>
            <p>로딩중입니다. 잠시만 기다려주세요...</p>
        </main>
    )
}