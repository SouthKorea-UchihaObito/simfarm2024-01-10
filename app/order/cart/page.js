import Link from 'next/link'
import '../../styles/cart/cart.scss'
import CartLoacl from './cartLocal'
export default function Cart(){
    return(
        <main className="cart">
            <h3>장바구니</h3>
            <CartLoacl/>
        </main>
    )
}