import Image from 'next/image'
import Link from 'next/link'
import notFound from '/public/image/question.svg'
export default function NotFound(){
    return ( 
        //404 페이지 보여주고 싶을 때
        // 상위 폴더에 생성 가능 (모든 페이지에서 404페이지 보여주기 가능)
        <main className='notFound'>
            <Image src={notFound} width={200} alt='notFoundImage' title='https://pixabay.com/ko/users/kropekk_pl-114936/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=350170'/>
            <p>원하시는 페이지를 찾을 수 없습니다.</p>
            <p>
                찾으려는 페이지의 주소가 잘못 입력되었거나,<br/>
                주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.<br/>
                입력하신 페이지의주소가 정확한지<br/>
                다시 한번 확인하여주시기 바랍니다.
            </p>
            <Link href='/'>홈으로 이동</Link>
        </main>
    )
}