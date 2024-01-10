'use client'
import Image from "next/image"
import Link from "next/link"
import close from '/public/image/header/icons8-close.png'
import { useEffect, useState } from "react"
export default function CartLoacl(){
    let [productList, setProductList] = useState([])
    let [numArr, setNumArr] = useState([])
    let [cartValue, setCartValue] = useState(null)
    useEffect(()=>{
        let cartProductList = localStorage.getItem('productInfo')
        cartProductList = JSON.parse(cartProductList)
        setProductList(cartProductList)
        if(localStorage.getItem('productInfo')){
            setCartValue(true)
        } else {
            setCartValue(false)
        }
    }, [])
    const [quantityNum, setQuantityNum] = useState(false) // 수량 값 100개 이상 확인 유무 값 
    const quantityOnChange = (e, item) => {
        // const valueNum = Number(e.target.value)
        // if(valueNum > 100){
        //     setQuantityNum(true)
        // } else {
        //     setQuantityNum(false)
        // }
        // if(isNaN(valueNum)) return;
        // setQuantityValue(valueNum)
    }
    const handleSingleCheck2 = (checked, id) => { // 단일 체크 함수
        if(checked){
            // 단일 선택 시 체크된 아이템을 배열에 추가함
            // setCheckItems([...checkItems, id])
            setCheckItems(prev => [...prev, id])
        } else {
            // 단일 선택 해재 세 체크된 아이템을 제외한 배열임
            setCheckItems(checkItems.filter((el)=>{
                el !== id
            }))
        }
        
    }
    const handleAllCheck2 = (checked) => { // 전체 체크 함수
       if(checked){
        // 전체 선택 클릭 시 데이터의 모든 아이템(id)을 담은 배열로 checkItems State의 상태를 업데이트
        const idArray = []
        productList.forEach((el)=>{
            idArray.push(el.id)
        })
        setCheckItems([...checkItems, idArray])
       } else {
        setCheckItems([])
       }
    }
    // 체크 이벤트
    const [checkItems, setCheckItems] = useState([]); // 체크된 아이템을 담을 배열
    const [totalPrice, setTotalPrice] = useState({}) // 총 가격
    const [productPrice, setProductPrice] = useState({})

    const [isChecked, setIsChecked] = useState(null)
    const handleSingleCheck = (checked, id, prices) =>{ // 개별 체크
       if(checked){
            setCheckItems([...checkItems, id])
            setProductPrice({...productPrice, [id]: prices})
       } else {
            setCheckItems(checkItems.filter((el)=> el !== id))
            setProductPrice({...productPrice, [id]: 0})
       }
    }
    const handleAllCheck = (checked) => { // 전체 체크
        if(checked) {
            const allCheckBox = []
            productList.forEach((el)=>allCheckBox.push(el.id))
            setCheckItems(allCheckBox)
            setProductPrice({...totalPrice})
        } else {
            setCheckItems([])
            setProductPrice({})
        } 
    }
    const setPriceList = (prices, id) => { // 가격
        setTotalPrice({...totalPrice, [id]: prices})
        if(checkItems.includes(id)){
            setProductPrice({...productPrice, [id]: prices})
        }
    }
    // console.log(Object.values(productPrice)) // 객체를 배열로 보여주기
    let getTotalPrice = 0 // 총 금액 관리
    for(let i = 0; i < Object.values(productPrice).length; i++){
        getTotalPrice += Object.values(productPrice)[i]
    }
    const quantityMinus = (e, item) => {
        let productListCopy = [...productList]
        if(item.quantityCount > 1){
            let medium
            productList.find((el, index)=>{
                if(el.id === item.id){
                    medium = productListCopy[index].price / productListCopy[index].quantityCount
                    productListCopy[index].quantityCount -= 1
                    productListCopy[index].price = productListCopy[index].price - medium
        
                    setProductList(productListCopy)
                }
            })
        }
    }
    const quantityPlus = (e, item) => {
        let productListCopy = [...productList]
        if(item.quantityCount < 100){
            let medium
            productList.find((el, index)=>{
                if(el.id === item.id){
                    medium = productListCopy[index].price / productListCopy[index].quantityCount
                    productListCopy[index].quantityCount += 1
                    productListCopy[index].price = productListCopy[index].price + medium
                    setProductList(productListCopy)
                }
            })
        }
    }
    const converPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    if(cartValue === true) {
        return(
            <form>
                <table className="cartList">
                    <colgroup>
                        <col width='5%'/>
                        <col width='5%'/>
                        <col width='40%'/>
                        <col width='15%'/>
                        <col width='10%'/>
                        <col width='10%'/>
                        <col width='10%'/>
                        <col width='5%'/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" id='allCheck' className='checkbox' onChange={(e)=>{
                                    handleAllCheck(e.target.checked)
                                }} checked={checkItems.length === productList.length ? true : false}/>
                                <label htmlFor='allCheck' className='checkbox' onClick={()=>{handleAllCheck}}><i/></label>
                            </th>
                            <th></th>
                            <th>상품/옵션</th>
                            <th>수량</th>
                            <th>상품금액</th>
                            <th>할인/적립</th>
                            <th>합계금액</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productList.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>
                                            <input type="checkbox" id={"oneCheck"+ [index]} name={item.id} className='checkbox' onChange={(e)=>{
                                                handleSingleCheck(e.target.checked, item.id, item.price)
                                            }} checked={checkItems.includes(item.id) ? true : false}/>
                                            <label htmlFor={"oneCheck" + [index]} className='checkbox'><i/></label>
                                        </td>
                                        <td>{index}</td>
                                        <td className='productInfo'>
                                            <div className='productItem' key={index}>
                                                <div className='productImage'>
                                                    <Image src={item.productImage} alt={item.productImageReference} width={100} height={100}/>
                                                </div>
                                                <div>
                                                    <h4><Link href={'/detailgroup/bestdetail/' + item.id.toString()}>{item.koreanTitle}</Link></h4>
                                                    <h4><Link href={'/detailgroup/bestdetail/' + item.id.toString()}>{item.title}</Link></h4>
                                                    <span>size : {item.menuItem}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='numberBox'>
                                                <button className='minus' type='button' onClick={(e)=>{quantityMinus(e, item)}}>-</button>
                                                <input type='number' onChange={(e)=>{quantityOnChange(e, item)}} value={item.quantityCount}/>
                                                <button className='plus' type='button' onClick={(e)=>{quantityPlus(e, item)}}>+</button>
                                            </div>
                                            {quantityNum === false ? <p className="minimumText">최소주문량 1개이상</p> : <p style={{color:'red'}}>(최대주문수량 100개)</p>} 
                                        </td>
                                        {/* <td><input type="number" defaultValue={converPrice(item.price)}/></td> */}
                                        <td><span>{item.OriginalPrice.toLocaleString()}</span></td>
                                        <td>-</td>
                                        <td><span>{item.price.toLocaleString()}</span></td>
                                        <td>
                                            <button>결제</button>
                                            <button>삭제</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className='summaryGroup'>
                    <div className='amountGroup'>
                        <span>총 상품금액</span>
                        <span>0원</span>
                    </div>
                    <div className='deliveryGroup'>
                        <span>배송비</span>
                        <span>0원</span>
                    </div>
                    <div className='allpaymentgroup'>
                        <span>총 결제금액</span>
                        <span>
                            {getTotalPrice.toLocaleString()}원
                        </span>
                    </div>
                </div>
                <div className='paymentBtnGroup'>
                    <button type='submit' className='selectProductBtn'>선택상품주문</button>
                    <button type='submit' className='allProductBtn'>전체상품주문</button>
                </div>
            </form>
        )
    } else {
        return(
            <div className="cartNull">
                <div>
                    <p>장바구니함에 상품이 없습니다.</p>
                </div>
            </div>
        )
    }
}