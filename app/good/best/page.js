import Link from "next/link";
import '../../styles/good/goodAll.scss'
import AllItemBox from "./allItemBox";
export default function Best(){
    return(
        <main className="allGood">
            <h2>인기상품</h2>
            <nav>
                <ul>
                    <li><Link href='/'>인기상품</Link></li>
                    <li><Link href='/'>이달의상품</Link></li>
                    <li><Link href='/'>할인상품</Link></li>
                </ul>
            </nav>
            <AllItemBox/>
        </main>
    )
}