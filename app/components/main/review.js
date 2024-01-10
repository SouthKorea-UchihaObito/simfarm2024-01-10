
"use client";
import Link from 'next/link'
import Image from 'next/image'
import '../../styles/main/main.scss'
import { useState } from 'react'
let reviewArr = [
    {id : 0, name : "Ari shoes", text : `이 신발 사용 중인데 너무 편해요 운동할때 딱이네요
    디자인도 너무 마음에 들고요`},
    {id : 1, name : "One day shoes", text : `이 신발 사용 중인데 너무 편해요 운동할때 딱이네요
    디자인도 너무 마음에 들고요`},
    {id : 2, name : "Ori Super shoes", text : `이 신발 사용 중인데 너무 편해요 운동할때 딱이네요
    디자인도 너무 마음에 들고요`},
    {id : 3, name : "Speed shoes", text : `이 신발 사용 중인데 너무 편해요 운동할때 딱이네요
    디자인도 너무 마음에 들고요`},
    {id : 4, name : "Star shoes", text : `이 신발 사용 중인데 너무 편해요 운동할때 딱이네요
    디자인도 너무 마음에 들고요`}
]
function Review(){
  let [star, setStar] = useState(5)
  return(
    <section className="section7">
      <div className='sectionTitle'>
        <h2>Best review</h2>
        <Link href="/">리뷰 보러 가기 →</Link>
      </div>
      <div className='reviewSlide' >
        <div className='reviewGroup original'>
          {
            reviewArr.map((a, i)=>{
              return(
                <div className='reviewBox' key={i}>
                  <Image src={require("/public/image/main/review/reviewitem" + i + ".png")} alt={a.name}/>
                  <p>{a.text}</p>
                  <p>{star}</p>
                  <p><span>asdsad232</span><span>2023.06.26</span></p>
                </div>
              )
            })
          }
        </div>
        <div className='reviewGroup clone'>
          {
            reviewArr.map((a, i)=>{
              return(
                <div className='reviewBox' key={i}>
                  <Image src={require("/public/image/main/review/reviewitem" + i + ".png")} alt={a.name}/>
                  <p>{a.text}</p>
                  <p>{star}</p>
                  <p><span>asdsad232</span><span>2023.06.26</span></p>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
export default Review