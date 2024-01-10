import Link from 'next/link'
import '../../styles/main/main.scss'
function Benefits(){
    return(
        <section className='section6'>
          <div className='sectionTitle'>
            <h2>Membership</h2>
          </div>
          <p className='beneFits'>심팜팜 쇼핑몰 만의 멤버쉽 혜택</p>
          <p className='beneFitsText'>지금 바로 회원가입 하셔서 할인쿠폰과 이벤트 혜택들을 누려보세요</p>
          <div className='beneGroup'>
            <div className='beneBox'>
              <p>3만원 이상 구매 시</p>
              <h5>20% 할인 쿠폰</h5>
              <Link href="/auth/agreement">회원가입 →</Link>
            </div>
            <div className='beneBox'>
              <p>생일기념 선물을 드립니다.</p>
              <h5>생일 쿠폰</h5>
              <Link href="/auth/agreement">회원가입 →</Link>
            </div>
            <div className='beneBox'>
              <p>가입 후 한달 간</p>
              <h5>배송비 무료</h5>
              <Link href="/auth/agreement">회원가입 →</Link>
            </div>
          </div>
        </section>
    )
}
export default Benefits