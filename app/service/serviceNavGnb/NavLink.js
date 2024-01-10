'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NavLink({ href, text, activeClassName}){
    const pathUrl = usePathname()
    const isActive = pathUrl === href
    return(
        <Link className={isActive ? activeClassName : ''} href={href}>{text}</Link>
    )
}