'use client'
import { useRouter } from "next/navigation"
export default function PrevBtn() {
    let router = useRouter()
    return (
        <button type="button" onClick={()=>{router.back()}}>뒤로가기</button>
    )
}