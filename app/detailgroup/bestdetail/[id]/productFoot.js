'use client'
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
export default function ProductFoot({result, productTabQa}) {
    let params = useParams() // 현재 [dynamic route]에 입력한내용 (URL 파라미터) 을 출력
    let productTabInfo = [
        {id: 0, tabMenuTitle: '상품상세정보', productName: result.title, productPrice: result.price, productImage:result.imageUrl, productReference:result.reference},
        {id: 1, tabMenuTitle: '배송/반품/교환 안내'},
        {id: 2, tabMenuTitle: '상품리뷰'},
        {id: 3, tabMenuTitle: '상품문의'}
    ]
    let [productTabNum, setProductTabNum] = useState(0)
    let [idTrue, setIdTrue] = useState(false)
    return (
        <div className="productFoot">
            <div className="productTabGroup">
                {
                    productTabInfo.map((item, index)=>{
                        return (
                            <button type="button" key={index} onClick={(e)=> {setProductTabNum(index)}} className={productTabNum === item.id ? "active" : ""}>{item.tabMenuTitle}</button>
                        )
                    })
                }
            </div>
            <ProductTabContent productTabInfo={productTabInfo} productTabNum={productTabNum} productTabQa={productTabQa} params={params}/>
        </div>
    )
}
function ProductTabContent({productTabInfo, productTabNum, productTabQa, params}) {
    let [productFade, setProductFade] = useState('')
    return (
        <div className={'productTabOff ' + productFade}>
            {
                [
                    <div>
                        <h5>상품상세정보</h5>
                        <Image src={productTabInfo[0].productImage} alt={productTabInfo[0].productReference} width={1200} height={950}/>
                    </div>,
                    <div>
                        <div className="productGuide">
                            <h5>배송 안내</h5>
                            <p>- 배송비 : 기본배송료는 3,000원 입니다. (도서,산간,오지 일부지역은 배송비 3000원 추가 됩니다) 300,000원 이상 구매시 무료배송입니다.</p>
                            <p>- 가입 후 한달 간 무료 배송입니다. (기간 마감 후 유료 배송으로 전환)</p>
                            <p>- 본 상품의 평균 배송일은 2일입니다.(입금 확인 후) 택배사의 사정, 기상 상황에 따라 다소 늦어질수 있습니다.[배송예정일은 주문시점(주문순서)에 따른 유동성이 발생하므로 평균 배송일과는 차이가 발생할 수 있습니다.]</p>
                        </div>
                        <div className="productGuide">
                            <h5>반품 및 반품 안내</h5>
                            <p>- 상품 택(tag)제거 또는 개봉으로 상품 가치 훼손 시에는 상품수령후 7일 이내라도 교환 및 반품이 불가능합니다.</p>
                            <p>- 고객 변심에 의한 교환, 반품은 고객께서 배송비를 부담하셔야 합니다(제품의 하자,배송오류는 제외)</p>
                            <p>- 일부 상품은 면단, 재질 가격 변동 등 시세 사정으로 가격이 변동될 수 있습니다.</p>
                            <p>- 제품 및 본 상품의 박스 훼손, 분실 등으로 인한 상품 가치 훼손 시 교환 및 반품이 불가능 하오니, 양해 바랍니다.</p>
                            <p>- 일부 특가 상품의 경우, 인수 후에는 제품 하자나 오배송의 경우를 제외한 고객님의 단순변심에 의한 교환, 반품이 불가능할 수 있사오니, 각 상품의 상품상세정보를 꼭 참조하십시오.</p>
                        </div>
                        <div className="productGuide">
                            <h5>환불 안내</h5>
                            <dl>
                                <dt>1. 환불 조건</dt>
                                <dd>초기 불량인 경우에 한하며, 상품 수령일로 부터 7일 이내AS 센터에 확인을 받으신 후 구매처를 통해 환불을 받으실수 있습니다.</dd>
                            </dl>
                            <dl>
                                <dt>2. 택배비</dt>
                                <dd>
                                    초기불량의 경우 심팜에서 왕복 택배비를 부담해 드리겠습니다. 사용 중 불량의 경우 무상 처리기간은 보내시는 비용은 소비자께서 하시고, 받으실때는 심팜에서 부담하겠습니다. 1년 이후 유상 처리 기간에는 소비자께서 왕복 택배비를 부담해주셔야 합니다. 아울러 소비자 과실인 경우도 소비자께서 부담해주셔야 합니다.
                                </dd>
                            </dl>
                            <dl>
                                <dt>3. 상품 청약철회</dt>
                                <dd>
                                    상품 청약철회 가능기간은 상품 수령일로 부터 7일 이내 입니다.
                                </dd>
                            </dl>
                            <dl>
                                <dt>A/S 안내</dt>
                                <dd>- 소비자분쟁해결 기준(공정거래위원회 고시)에 따라 피해를 보상받을 수 있습니다.</dd>
                            </dl>
                        </div>
                    </div>,
                    <div>
                        <h5>상품 리뷰</h5>
                        <p>준비중입니다...</p>
                    </div>,
                    <div className="productqaGroup">
                        <h5>상품문의</h5>
                        {
                            productTabQa.map((item, index)=>{
                                return (
                                    <div key={index} className="qaDataGroup">
                                        <div className="qaDataHead">
                                            <div className="qaDataHGroup">
                                                {

                                                }
                                                {/* <div className="qaResult">답변완료</div> */}
                                                <div>
                                                    <p>{item.author}</p>
                                                    <p>
                                                        ⇘ <Link href={'/detailgroup/bestqadetail/' + [productTabQa[index]._id.toString()]}>{item.title}</Link>
                                                    </p>
                                                </div>
                                            </div>
                                            <span>{item.date}</span>
                                        </div>
                                        
                                    </div>
                                )
                            })
                        }
                        <div className="bestWriteBox">
                            <Link href={'/writegroup/' + [params.id.toString()]} className="bestqaWriteBtn">문의하기</Link>
                        </div>
                    </div>
                ][productTabNum]
            }
        </div>
    )
}