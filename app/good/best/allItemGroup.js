'use client'
import BestDetailLink from "./bestDetailLink"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
export default function AllItemGroup({result}) {
    let [aidResultData, setAidResultData] = useState(result) // 원조 데이터
    let [resultData, setResultData] = useState(result) // 렌더링 될 데이터
    let [activeClass, setActiveClass] = useState('active') // 클래스
    let [classOk, setClassOk] = useState(0)
    function All(e) {
        let copyResult = [...aidResultData]
        setResultData(copyResult)
        setClassOk(0)
    }
    function HighSales() {
        console.log('높은판매')
        let copyResult = [...resultData]
        copyResult.sort((a, b)=>{
            return b.ranking - a.ranking
        })
        setResultData(copyResult)
        setClassOk(1)
    }
    function LowPrice() {
        console.log('가격 오름차순')
        let copyResult = [...resultData]
        copyResult.sort((a, b)=>{
            return a.price - b.price
        })
        setResultData(copyResult)
        setClassOk(2)
    }
    function HighPrice() {
        console.log('가격 내림차순')
        let copyResult = [...resultData]
        copyResult.sort((a, b)=>{
            return b.price - a.price
        })
        setResultData(copyResult)
        setClassOk(3)
    }
    return (
        <div className="allItemGroup">
            <div className="allexplanation">
                <p>총 <span style={{color:'red'}}><strong>{resultData.length}개</strong></span>의 상품이 있습니다.</p>
                <div className="allFun">
                    <button className={classOk === 0 ? activeClass : null} onClick={(e)=>{All(e)}} >전체</button>
                    <button className={classOk === 1 ? activeClass : null} onClick={(e)=>{HighSales(e)}}>판매높은순</button>
                    <button className={classOk === 2 ? activeClass : null} onClick={(e)=>{LowPrice(e)}}>낮은가격순</button>
                    <button className={classOk === 3 ? activeClass : null} onClick={(e)=>{HighPrice(e)}}>높은가격순</button>
                </div>
            </div>
            <div className="itemGroup">
                {
                    resultData.map((a, i)=>{
                        return(
                            <div className="item" key={i}>
                                <Link className="itemImageLink" href={'/detailgroup/bestdetail/' + a._id.toString()}>
                                    <Image src={a.imageUrl} alt='bestShoesImage' title={a.reference} width={310} height={350}/>
                                </Link>
                                <h4><Link href={'/detailgroup/bestdetail/' + a._id.toString()}>{a.koreanTitle}</Link></h4>
                                <h4><Link href={'/detailgroup/bestdetail/' + a._id.toString()}>{a.title}</Link></h4>
                                <div className="itemMoneyBox">
                                    <span className="checking">판매수 <strong>{a.ranking}</strong></span>
                                    <span className="price"><strong>{a.price}</strong> 원</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}