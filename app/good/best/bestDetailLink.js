'use client'
import { useParams, useRouter, useSearchParams } from "next/navigation"
export default function BestDetailLink(){
    let router = useRouter()
    // let a = usePathname() // 현재 URL 출력
    // let b = useSearchParams() // 현재 서치파라미터 / 쿼리스트링 출력
    // let c = useParams() // 유저가 [dynamic route] 입력한것 출력
    return(
        <button onClick={()=>{
            router.push('/')
        }}>이동</button>
    )
}