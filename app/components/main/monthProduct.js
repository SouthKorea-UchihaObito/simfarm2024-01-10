"use client"
import Link from 'next/link'
import Image from 'next/image'
import '../../styles/main/main.scss'
import { useEffect, useState } from "react";
let monthArr = [
    {id : 0, title : "Pink Shoes", content :"핑크풍 로열 스니커즈", monthInfo : `헬스장을 찾는 수요가 늘어나는 추세입니다.
    그에 맞춰 발건강도 필수이죠 제2의 심장이라
    불리는 신체부위입니다. 에어로 편안한 운동과
    일상생활을 즐기세요!
    합리적인 가격과 편안한 운동화를 경험해봐요`},
    {id : 1, title : "Cute Shoes", content :"귀엽고 컬러풀한 스니커즈", monthInfo : `귀여운 운동화를 선호하는 추세입니다.
    여성분들에게 잘어울리는 Green Shoes 신발을 소개합니다.
    편안한 착용감과 귀여운 디자인을 선보입니다. `},
    {id : 2, title : "Simple Shoes", content :"심플&모던 스니커즈", monthInfo : `정장에 어울릴만한 신발을 찾으신다면
    Black Shoes 을 추천드립니다. 
    심플한 스타일에 어떤 패션이든 잘어울립니다.
    `},
    {id : 3, title : "All Hp Shoes", content :"운동에 특화된 스니커즈", monthInfo : `운동할때 최적화된 운동화를 소개드립니다.
    이 운동화의 특징은 편안한 착용감과
    오랜 운동에도 지치지 않는 피로감을 보여줍니다.
    고급 에어를 통하여 오랜시간 운동과 시너지를 보여줍니다.
    `}
]
function MonthProduct(){
  let [tab, setTab] = useState(0)
  return(
    <section className='section4'>
      <div className='sectionTitle'>
        <h2>Product of The Month</h2>
        <Link href="/">이달의 상품 목록 →</Link>
      </div>
      <div className='monthZone'>
        <div>
          <TabContent monthArr={monthArr} tab={tab}/>
          <div className='monthNumGroup'>
            {
              monthArr.map((item, i)=>{
                return(
                  <button className={tab === item.id ? "active" : ""} key={item.id} onClick={()=>{ setTab(i)}} >{item.id + 1}</button>
                )
              })
            }
          </div>
        </div>
        <div className='monthImgGroup'>
          {
            monthArr.map((item, i)=>{
              return(
                <button className={tab === item.id ? "active" : ""} key={item.id} onClick={()=>{ setTab(i)}}>
                  <Image src={require("/public/image/main/monthProduct/monthitem" + i + ".png")} alt={item.title} />
                </button>
              )
            })
          }
        </div>
        <div className='monthBigImgGroup'>
          <TabImage monthArr={monthArr} tab={tab}/>
        </div>
      </div>
    </section>
  )
}
function TabContent({tab, monthArr}){
  return(
    [
      <div>
        <h4>{monthArr[0].title}</h4>
        <p>{monthArr[0].content}</p>
        <p>{monthArr[0].monthInfo}</p>
        <Link href="#">제품보러가기 →</Link>
      </div>,
      <div>
        <h4>{monthArr[1].title}</h4>
        <p>{monthArr[1].content}</p>
        <p>{monthArr[1].monthInfo}</p>
        <Link href="#">제품보러가기 →</Link>
      </div>,
      <div>
        <h4>{monthArr[2].title}</h4>
        <p>{monthArr[2].content}</p>
        <p>{monthArr[2].monthInfo}</p>
        <Link href="#">제품보러가기 →</Link>
      </div>,
      <div>
        <h4>{monthArr[3].title}</h4>
        <p>{monthArr[3].content}</p>
        <p>{monthArr[3].monthInfo}</p>
        <Link href="#">제품보러가기 →</Link>
      </div>
    ][tab]
  )
}
function TabImage(props){
  return(
    [
      <Image src={require("/public/image/main/monthProduct/monthBigitem" + props.monthArr[0].id + ".png")} alt='monthBigitem1' />,
      <Image src={require("/public/image/main/monthProduct/monthBigitem" + props.monthArr[1].id + ".png")} alt='monthBigitem2' />,
      <Image src={require("/public/image/main/monthProduct/monthBigitem" + props.monthArr[2].id + ".png")} alt='monthBigitem3' />,
      <Image src={require("/public/image/main/monthProduct/monthBigitem" + props.monthArr[3].id + ".png")} alt='monthBigitem4' />
    ][props.tab]
  )
}
export default MonthProduct