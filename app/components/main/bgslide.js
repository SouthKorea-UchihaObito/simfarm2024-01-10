'use client'
import Image from 'next/image'
import Link from 'next/link'
import {EffectCreative, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import '../../styles/main/main.scss'
import { useRef, useState } from 'react';
let bgSlide = [
  {id : 1, name : "NEW DESIGN BECOMING", koName : "스피드 28 슈즈", enName : "Speed 28 shoes", index : "1", src : require("/public/image/main/bgslide/bg1.png") , link : "#", title : "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/dwKiHoqqxk8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"},
  {id : 2, name : "MAKE STRONG SHOES", koName : "슈퍼 99 슈즈", enName : "Super 99 shoes", index : "2", src : require("/public/image/main/bgslide/bg2.png") , link : "#", title : "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/wmdcUQ0CJ4c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"},
  {id : 3, name : "WEAR COMFORTABLE SHOES", koName : "모던 1500 슈즈", enName : "Modern 28 shoes", index : "3", src : require("/public/image/main/bgslide/bg3.png") , link : "#", title : "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/mWYhrOiAgmA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"},
  {id : 4, name : "MAKE NICE SHOES", koName : "나이스 1004 슈즈", enName : "Nice 1004 shoes", index : "4", src : require("/public/image/main/bgslide/bg4.png") , link : "#", title : "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/8W-p8SS6NJE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"}
]
function Bgslide(){
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return(
    <section className='section1'>
      <Swiper className='section1Center' // mySwiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative, Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true, type: "fraction" }}
        speed='500'
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        loop={true}
        >
        {
          bgSlide.map((a, i)=>{
            return(
              <SwiperSlide className='sectionBg' key={a.id}>
                <Image src={a.src} alt={a.koName} title={a.title}/>
                <div className='bgInfo'>
                  <p>{a.name}</p>
                  <h3>{a.koName}</h3>
                  <h3>{a.enName}</h3>
                  <Link href="/">더 알아보기 →</Link>
                </div>
              </SwiperSlide> 
            )
          })
        }
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </section>
  )
}
export default Bgslide