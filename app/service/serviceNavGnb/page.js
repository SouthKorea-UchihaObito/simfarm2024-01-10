'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import '../../styles/service/service.scss'
export default function ServiceNavGnb(){
    return(
        <div className="serviceNavGnb">
            <nav>
                <ul>
                    <li>
                        <span>고객센터</span>
                        <ul>
                            <li><NavLink activeClassName='active' text='공지사항' href='/service/notice'/></li>
                            <li><NavLink activeClassName='active' text='1:1문의' href='/service/qa'/></li>
                            <li><NavLink activeClassName='active' text='자주묻는질문 FAQ' href='/service/faq'/></li>
                            <li><NavLink activeClassName='active' text='배송시스템' href='/service/delivery'/></li>
                            <li><NavLink activeClassName='active' text='이벤트' href='/service/event'/></li>
                        </ul>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>고객게시판</span>
                        <ul>
                            <li><NavLink activeClassName='active' text='커뮤니티' href='/service/community'/></li>
                            <li><NavLink activeClassName='active'text='리뷰'  href='/service/review'/></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}