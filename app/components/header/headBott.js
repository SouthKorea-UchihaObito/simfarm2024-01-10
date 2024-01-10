"use client"
import Image from "next/image"
import Link from "next/link"
import Logo from '/public/image/header/shopify-logo.svg'
import menu from '/public/image/header/icons8-menu.png'
import search from '/public/image/header/icons8-search.png'
import blockSearch from '/public/image/header/icons8-search_block.png'
import cart from '/public/image/header/icons8-cart.png' 
import myshop from '/public/image/header/icons8-my.png'
import close from '/public/image/header/icons8-close.png'
import { useEffect, useRef, useState } from "react"
export default function HaedBott(){
    let [searchbtn, setSearchBtn] = useState('')
    let [allMenu, setAllMenu] = useState('')
    let allMenuRef = useRef()
    const handlerAllMenu = (e) =>{
        document.body.style.overflowY = "hidden";
        setAllMenu('on')
    }
    const handlerAllMenuClose = (e) =>{
        document.body.style.overflowY = "";
        setAllMenu('')
    }
    useEffect(()=>{
        const handlerOutSide = (e) => {
            if(allMenuRef.current && !allMenuRef.current.contains(e.target)){
                document.body.style.overflowY = "";
                setAllMenu('')
            }
        }
        document.addEventListener('mouseup', handlerOutSide)
        return () => {document.removeEventListener('mouseup', handlerOutSide)}
    }, [allMenuRef])

    let [cartList, setCartList] = useState([])
    let [cartTrue, setCartTrue] = useState(null)
    useEffect(()=>{
        let a = setTimeout(() => {
            let cartProductOk = localStorage.getItem('productInfo')
            cartProductOk = JSON.parse(cartProductOk)
            setCartList(cartProductOk)
        }, 100);
        if(localStorage.getItem('productInfo') !== null){
            setCartTrue(true)
        } else {
            setCartTrue(false)
        }
        return () => {
            clearTimeout(a)
        }
    }, [cartList])
    return(
        <div className="headBott">
            <div className={'headAllMenu ' + allMenu} ref={allMenuRef}>
                <aside className="MenuContainer">
                    <div className="">
                        <h2><Link href="/"><Image src={Logo} alt='logo' title='https://worldvectorlogo.com,http://icons8.com/icons/logo/shopify-logo-2018' style={{width: '150px', height: '100%'}}/></Link></h2>
                        <button type="button" onClick={handlerAllMenuClose}><Image src={close} alt="AllMenuCloseImage" title="https://icons8.com/icon/16248/%EC%A7%80%EC%9A%B0%EB%8B%A4"/></button>
                    </div>
                    <nav>
                        <ul className="topMenu">
                            <li>
                                <span>전체상품</span>
                                <ul>
                                    <li><Link href='/'>여성신발</Link></li>
                                    <li><Link href='/'>남성신발</Link></li>
                                    <li><Link href='/'>아동신발</Link></li>
                                    <li><Link href='/'>슬리퍼</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="bottMenu">
                            <li>
                                <span>고객센터</span>
                                <ul>
                                    <li><Link href='/service/notice'>공지사항</Link></li>
                                    <li><Link href='/service/qa'>1:1문의</Link></li>
                                    <li><Link href='/service/faq'>자주묻는질문</Link></li>
                                    <li><Link href='/service/delivery'>배송시스템</Link></li>
                                    <li><Link href='/service/event'>이벤트</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="bottMenu">
                            <li>
                                <span>고객게시판</span>
                                <ul>
                                    <li><Link href='/service/community'>커뮤니티</Link></li>
                                    <li><Link href='/service/review'>리뷰</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </aside>
            </div>
            <div className={'AllMenudim ' + allMenu}></div>
            <div className='headGnb'>
                <div className='headLeft'>
                    <button onClick={handlerAllMenu}><Image src={menu} alt="AllMenu" title="https://icons8.com/icon/16247/menu"/></button>
                    <h1><Link href="/"><Image src={Logo} alt='logo' title='https://worldvectorlogo.com,http://icons8.com/icons/logo/shopify-logo-2018' style={{width: '100px', height: '100%'}}/></Link></h1>
                    <nav className='navbar'>
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
                            <li><Link href="/good/best">인기상품</Link></li> 
                            <li><Link href="/">이달의 상품</Link></li> 
                            <li><Link href="/">할인상품</Link></li> 
                            <li><Link href="/">이벤트</Link></li> 
                        </ul>
                    </nav>
                </div>
                <div className='headRight'>
                    <nav className='navbar'>
                        <ul>
                            <li className='searchBtn'>
                                <button type="button" onClick={()=>{setSearchBtn('on')}}>
                                    <Image src={search} alt="SearchImage" title='https://icons8.kr/icon/131/%EC%88%98%EC%83%89'/>
                                </button>
                            </li> 
                            <li className='cartBtn'>
                                {cartTrue === true ? <p className="cartTrueText"><span>{cartList.length}</span></p> : <p className="cartTrueText"><span>0</span></p>}
                                <Link href="/order/cart">
                                    <Image src={cart} alt="cartImage" title='https://icons8.kr/icon/17408/%EC%9E%AC%EA%B3%A0-%ED%8C%90%EB%A7%A4'/>
                                </Link>
                            </li> 
                            <li className='mypageBtn'>
                                <Link href="/">
                                    <Image src={myshop} alt="myshopImage" title=' https://icons8.kr/icon/15263/%EC%9B%90-%EC%82%AC%EC%9A%A9%EC%9E%90-%EB%82%A8%EC%84%B1'/>
                                </Link>
                            </li> 
                        </ul>
                    </nav>
                </div>
            </div>
            <div className={"searchZone " + searchbtn}>
                <form action='/'>
                    <button type="button" onClick={()=>{setSearchBtn('')}}><Image src={close} alt="searchcloseImage" title="https://icons8.com/icon/16248/%EC%A7%80%EC%9A%B0%EB%8B%A4"/></button>
                    <input type="search" defaultValue='Pink Shoes' name=''/>
                    <button type="submit"><Image src={blockSearch} alt="SearchImage" title="https://icons8.kr/icon/131/%EC%88%98%EC%83%89"/></button>
                </form>
            </div>
        </div>
    )
}