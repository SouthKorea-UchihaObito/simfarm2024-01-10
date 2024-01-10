import Image from 'next/image'
import jumpImage from '/public/image/main/banner/jumpImage.png'
import '../../styles/main/main.scss'
function Banner(){
  return(
    <section className='section3' title='https://pixabay.com/ko/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2024320/https://pixabay.com/ko/vectors/%EC%8B%A0%EB%B0%9C%EB%A5%98-%EB%AF%B8%EC%88%A0-%ED%8E%98%EC%9D%B8%ED%8A%B8-%EB%93%B1-7246982/https://www.pngwing.com/ko/free-png-zcqcc/download/https://www.pngwing.com/ko/free-png-ziosh/download'>
      <p>
        이달의 상품을 추천합니다.<br/>
        <b>개성있는</b> 아이템으로<br/>
        패션을 꾸며보아요!
      </p>
      <p>
        <b>600만개</b>인기 상품이 팔린 제품들로<br/>
        나만을 위한 패션 아이템을 추천받아보세요,
      </p>
      <Image src={jumpImage} alt="jumpImage" title='https://pixabay.com/ko/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2024320/https://pixabay.com/ko/vectors/%EC%8B%A0%EB%B0%9C%EB%A5%98-%EB%AF%B8%EC%88%A0-%ED%8E%98%EC%9D%B8%ED%8A%B8-%EB%93%B1-7246982/https://www.pngwing.com/ko/free-png-zcqcc/download/https://www.pngwing.com/ko/free-png-ziosh/download'/>
      {/*
        ! Multiple images were used. !
        ↓ reference Url ↓
        background-image: https://pixabay.com/ko/vectors/%EB%82%99%EC%84%9C-%EC%9D%8C%EC%95%85-%EB%8F%84%EC%8B%9C-%EC%98%88%EC%88%A0-2024320/
        shoesImage1 : https://pixabay.com/ko/vectors/%EC%8B%A0%EB%B0%9C%EB%A5%98-%EB%AF%B8%EC%88%A0-%ED%8E%98%EC%9D%B8%ED%8A%B8-%EB%93%B1-7246982/
        shoesImage2 : https://www.pngwing.com/ko/free-png-zcqcc/download
        shoesImage3 : https://www.pngwing.com/ko/free-png-ziosh/download
      */}
    </section>
  )
}
export default Banner