import Review from './components/main/review.js'
import Benefits from './components/main/benefits.js'
import Discount from './components/main/discount.js'
import MonthProduct from './components/main/monthProduct.js'
import Banner from './components/main/banner.js'
import BestProduct from './components/main/bestProduct.js'
import Bgslide from './components/main/bgslide.js'
export default async function Home() {
  return (
    <main className='main'>
      <Bgslide/>
      <BestProduct/>
      <Banner/>
      <MonthProduct/>
      <Discount/>
      <Benefits/>
      <Review/>
    </main>
  )
}
