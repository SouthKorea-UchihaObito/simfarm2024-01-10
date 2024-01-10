'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
export default function ProductImage(props) {
    let miniProduct = [
        {id : 0, src : props.resultImage, reference : props.reference },
        {id : 1, src : '/image/main/bestProduct/minishoesImage2' + ".svg", reference : 'minishoesImage'},
        {id : 2, src : '/image/main/bestProduct/minishoesImage3' + ".svg", reference : 'minishoesImage'},
        {id : 3, src : '/image/main/bestProduct/minishoesImage4' + ".svg", reference : 'minishoesImage'},
        {id : 4, src : '/image/main/bestProduct/minishoesImage5' + ".svg", reference : 'minishoesImage'},
    ]
    let [tabChange, setTabChange] = useState(0) // 검은색 이미지 on off 스위치 역할
    return (
        <div className="productImage">
            <div className="productBackImage">
                <ImageContent tabChange={tabChange} miniProduct={miniProduct} />
            </div>
            <div className="miniProdutImageGroup">
                {
                    miniProduct.map((item, i)=>{
                        return(
                            <button type="button" key={i} onClick={(e)=> {setTabChange(i)}} className={tabChange === item.id ? "active" : ""}>
                                <Image src={item.src} alt={item.reference} width={130} height={110} />
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}
function ImageContent({tabChange, miniProduct}) {
    let [fade, setFade] = useState('')
    useEffect(()=>{
        let timer = setTimeout(()=>{
            setFade('on')
        }, 10)
        return() => {
            clearTimeout(timer)
            setFade('')
        }
    }, [tabChange])
    return (
        <div className={'off ' + fade}>
            {
                [
                    <Image src={miniProduct[0].src} alt="shoesImage" title={miniProduct[0].reference} width={310} height={350}/>,
                    <Image src={miniProduct[1].src} alt="shoesImage" title={miniProduct[1].reference} width={310} height={350}/>,
                    <Image src={miniProduct[2].src} alt="shoesImage" title={miniProduct[2].reference} width={310} height={350}/>,
                    <Image src={miniProduct[3].src} alt="shoesImage" title={miniProduct[3].reference} width={310} height={350}/>,
                    <Image src={miniProduct[4].src} alt="shoesImage" title={miniProduct[4].reference} width={310} height={350}/>
                ][tabChange]
            }
        </div>
    )
}