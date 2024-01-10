
import Image from 'next/image'
import '../../styles/main/main.scss'
import Link from 'next/link'
import { connectDB } from '@/util/database'

export default async function BestProduct(){

  const client = await connectDB
  const db = client.db('forum')
  let result = await db.collection('best_product').find().toArray()
  const converPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  return(
    <section className='section2'>
      <div className='sectionTitle'>
        <h2>Best Product</h2>
        <Link href='/good/best'>인기 상품 목록 →</Link>
      </div>
      <div className='cardItem'>
        {
          result.map((a, i)=>{
            return(
              <div className='card' key={i}>
                <Link className='cardImageLink' href={'/detailgroup/bestdetail/' + a._id.toString()}>
                  <Image src={a.imageUrl} alt='bestShoesImage' title={a.reference} fill="true" />
                </Link>
                <h4><Link href={'/detailgroup/bestdetail/' + a._id.toString()}>{a.koreanTitle}</Link></h4>
                <h4><Link href={'/detailgroup/bestdetail/' + a._id.toString()}>{a.title}</Link></h4>
                <div className='productfootInfo'>
                  <span>판매수 <strong>{a.ranking}</strong></span>
                  <span><strong>{converPrice(a.price)}</strong> 원</span>
                </div>
              </div>
            )
          })              
        }
      </div>
    </section>
  )
}