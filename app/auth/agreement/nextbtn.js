'use client'

import Link from "next/link"
import { useState } from "react"
export default function NextBtn(props){
    let [trueData , setTrueData] = useState(props.btnData)
    return (
        <button disabled={trueData} onClick={(e)=>{console.log(e.target)}} type="submit">다음
            <Link href='/auth/signup'>다음</Link>
        </button>
    )
}