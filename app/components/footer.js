import Image from 'next/image'
import Link from 'next/link'
import FooterLogo from '/public/image/footer/shopify-logo-2018-white.svg'
import Naver from '/public/image/footer/naver.png'
import Kakao from '/public/image/footer/kakao.png'
import Instagram from '/public/image/footer/instagram.png'
import Youtube from '/public/image/footer/youtube.png'
export default function Footer(){
    return(
        <footer>
            <div className='footCenter'>
                <div className='footfirst'>
                <h2><Link href="/"><Image src={FooterLogo} alt='footerlogo' title='https://worldvectorlogo.com/logo/shopify-logo-2018' style={{width: '100px', height: '100%'}}/></Link></h2>
                <nav>
                <ul>
                    <li>
                        <Link href="/">전체상품</Link>
                        <ul className='subMenu'>
                            <li><Link href="/">여성신발</Link></li>
                            <li><Link href="/">남성신발</Link></li>
                            <li><Link href="/">아동신발</Link></li>
                            <li><Link href="/">슬리퍼</Link></li>
                        </ul>
                    </li> 
                    <li><Link href="/">인기상품</Link></li> 
                    <li><Link href="/">이달의 상품</Link></li> 
                    <li><Link href="/">할인상품</Link></li> 
                    <li><Link href="/">이벤트</Link></li> 
                    </ul>
                </nav>
                </div>
                <div className='footInfo'>
                <div className='footCS'>
                    <h3>고객센터</h3>
                    <p>1234-1234</p>
                    <p><span>평일(공휴일 제외) : 10:00 - 18:00</span><span>점심 : 12:00 - 13:00</span></p>
                    <p>제휴/기타문의 : ctallhack@naver.com</p>
                </div>
                <ul className='footInfoList'>
                    <li><Link href="#">심팜</Link></li>
                    <li><Link href="#">회사소개</Link></li>
                    <li><Link href="#">개인정보처리방침</Link></li>
                    <li><Link href="#">이용약관</Link></li>
                    <li><Link href="#">고객센터</Link></li>
                </ul>
                <address className='footInfoContent'>
                    <p>
                    <span>대표자 : 심팜</span><span>개인정보관리책임자 : 강이식</span><span>대표메일 : ctallhack@naver.com</span><br/>
                    <span>주소 : 서울특별자치기 동작구 사당로 12가길 10</span><span>고객센터 : 02-1234-5678</span><span>팩스번호 : 02-1234-1123</span><br/>
                    <span>통신판매제신고번호 : 제2023-사당좋아-1234호</span><span>사업자등록번호 : 107-00-000000</span><Link href="#"><strong>[사업자번호조회]</strong></Link>
                    </p>
                </address>
                <div className='footGuide'>
                    <p>이 사이트는 개인 포트폴리오이며, 상업적인 목적이 아님을 알립니다.</p>
                    <div className='footSns'>
                        <Link href="#"><Image src={Naver} alt='naverImage' title='https://www.pngwing.com/ko'/></Link> 
                        <Link href="#"><Image src={Kakao} alt='KakaoImage' title='https://www.pngwing.com/ko'/></Link>
                        <Link href="#"><Image src={Instagram} alt='InstagramImage' title='https://www.pngwing.com/ko'/></Link>
                        <Link href="#"><Image src={Youtube} alt='YoutubeImage' title='https://www.pngwing.com/ko'/></Link>
                    </div>
                </div>
                </div>
            </div>
        </footer>
    )
}