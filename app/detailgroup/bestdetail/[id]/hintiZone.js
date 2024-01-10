'use client'
import Link from "next/link"
import { use, useEffect, useState } from "react"
export default function HintZone({result}){
    const [quantityCount, setQuantityCount] = useState(1) /** 수량 **/ //수량 입력 값 state 값으로 관리
    const [quantityChecked, setQuantityChecked] = useState(false) /** 수량 **/ //수량 입력 체크 유무 값
    const [quantityNum, setQuantityNum] = useState(false) // 수량 값 100개 이상 확인 유무 값 
    const [showMenu, setShowMenu] = useState(false) /** 사이즈 **/ // 사이즈 옵션 박스 열기 / 닫기 여부 값
    const [menuItem, setMenuItem] = useState('사이즈를 선택해주세요.') /** 사이즈 **/ // 사이즈 옵션 기본 값
    const [sizeInfo, setSizeInfo] = useState() /** 사이즈 **/ //
    const [sizeChecked, setSizeChecked] = useState(true) /** 사이즈 **/ // 사이즈 체크 유무 값
    const handleQuantity = (type) => {
        if(type === 'plus'){
            if(quantityCount < 100){
                setQuantityCount(quantityCount+1)
            } 
            else if(quantityCount >= 99) {
                setQuantityNum(true)
            }
        }
        else {
            if(quantityCount > 1){
                setQuantityCount(quantityCount-1)
                setQuantityNum(false)
            }
        }
    }
    const quantityOnChange = (e) => {
        const valueNum = Number(e.target.value)
        if(valueNum > 100){
            setQuantityNum(true)
        } else {
            setQuantityNum(false)
        }
        setQuantityCount(valueNum)
    }  
    const quantityOnBlur = (e) => {
        if(e.target.value === 0 || e.target.value === '0' || e.target.value >= 101){
            setQuantityCount(1)
            setQuantityNum(false)
        }
        if(e.target.value < 100){
            setQuantityNum(false)
        }
    }
    const handleSelect = (item) => {
        setMenuItem(item)
        setShowMenu(false)
        if(item === '사이즈를 선택해주세요.'){
            setSizeChecked(true)
        } else {
            setSizeChecked(false)
        }
    }
    const converPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    let [cartPopupShow, setCartPopupShow] = useState(false) // 상품이 장바구니에 추가되었음을 알리는 Popup의 스위치 역활
    let [reCartPopupShow, setReCartPopupShow] = useState(false) // 중복된 상품이 장바구니에 추가되었음을 알리는 Popup의 스위치 역활
    let [cartChecked, setCartChecked] = useState(null) // 장바구니에 데이터 있는지 확인하는 state
    let [cartCopyList, setCartCopyList] = useState([]) // localStorage 에 있는 데이터 담아줄 state
    const cartSave = () => { // 장바구니에 물건 담기
        const productInfo = { // 상품 정보
            id : result._id,
            productImage : result.imageUrl,
            productImageReference : result.reference,
            title : result.title,
            koreanTitle : result.koreanTitle,
            quantityCount : quantityCount,
            OriginalPrice : result.price,
            price : quantityCount * result.price,
            quantityCount : quantityCount,
            menuItem : menuItem
        }
        if(cartChecked === false) { // localStorage 추가 안했으면 1회 저장 / cartChecked 가 true라면 로컬스토리지 데이터가 없다는 것으로 간주 되서 처음 1회저장
            console.log('최초 1회 저장')
            setCartPopupShow(true) // Popup 디자인 스위치 On
            localStorage.setItem('productInfo', JSON.stringify([productInfo])) // 상품 저장을 위해 JSON 형태로 바꿔서 저장
        }
        let productPrint = localStorage.getItem('productInfo')
        productPrint = JSON.parse(productPrint)
        if(cartChecked === true) { // localStorage 에 상품 1개이상이면 상품 장바구니로 push 해주기
            let newArray = productPrint.findIndex((ele, index, arr)=>{ // 중복 상품인지 확인
                return ele.id === productInfo.id && ele.menuItem === productInfo.menuItem // id와 상품의 사이즈를 비교 한다. 
            })
            if(newArray === -1){ // 중복 상품이 없다면
                setCartPopupShow(true) // Popup 디자인 스위치 On
                let productPrint = localStorage.getItem('productInfo')
                productPrint = JSON.parse(productPrint)

                let copyProductPrint = [...productPrint]
                copyProductPrint.push(productInfo) // 상품 추가
                localStorage.setItem('productInfo', JSON.stringify(copyProductPrint)) // 상품 저장을 위해 JSOn 형태로 바꿔서 저장 (덮어씌워서 저장되는게 아니라 추가)
                setCartCopyList(productPrint)
            } else { // 중복 상품이 있다면
                let productPrint = localStorage.getItem('productInfo')
                productPrint = JSON.parse(productPrint)

                let copyProductPrint = [...productPrint]
                let resultProductPrint = productPrint.findIndex((el, index, arr)=>{ // 중복되는 id값과 사이즈값 찾기 인덱스를 찾는다.
                    return el.id === productInfo.id && el.menuItem === productInfo.menuItem
                })
                copyProductPrint[resultProductPrint].quantityCount += quantityCount // 해당 상품의 갯수를 갯수만큼 증가시켜준다.
                copyProductPrint[resultProductPrint].price += quantityCount * result.price
                localStorage.setItem('productInfo', JSON.stringify(copyProductPrint))
                setReCartPopupShow(true) // Popup 디자인 스위치 On
            }
            return
        }
    }
    useEffect(()=>{
        if(!localStorage.getItem('productInfo')){ // 데이터 없으면 false
            setCartChecked(false)
        } else { // 데이터 있으면 true
            setCartChecked(true)
        }
    }, [cartSave])
    return(
        <div className='hintZone'>
            <form>
                <div className="quantityZone">
                    <h5>수량선택</h5>
                    <div className="quantityNumBox">
                        <button className='minus' type='button' onClick={()=>{handleQuantity('minus')}}>-</button><input type='number' onChange={(e)=>{quantityOnChange(e)}} onBlur={(e)=>{quantityOnBlur(e)}} value={quantityCount}/><button className='plus' type='button' onClick={()=>{handleQuantity('plus')}}>+</button>
                    </div>
                    {quantityNum === false ? <p>최소주문량은 1개이상 입니다.</p> : <p style={{color:'red'}}>(최대주문수량은 100개 입니다.)</p>} 
                </div>
                <div className="selectGroup">
                    <h5>사이즈선택</h5>
                    <button type="button" className={`selectBox ${showMenu ? 'active' : ''}`} onClick={()=>{ setShowMenu(!showMenu)}}><span>{menuItem}</span><span style={showMenu === true ? {transform : 'rotate(0deg)'} : {transform : 'rotate(180deg)'}}>▼</span></button>
                    {showMenu && (
                        <ul className="selectOptions">
                            <li onClick={(e) => handleSelect('사이즈를 선택해주세요.')}><button type="button">사이즈를 선택해주세요.</button></li>
                            {
                                result.size.map((item, i) => {
                                    return (
                                        <li key={i} onClick={()=> handleSelect(item)}>
                                            <button type="button">{item}</button>
                                        </li>
                                    )
                                })
                            } 
                        </ul>
                    )}
                    <input type="hidden" name={quantityCount}/>                    
                    <input type="hidden" name={menuItem}/>
                </div>
                <button type="button" disabled={sizeChecked} className="productPurchaseBtn">구매</button>
                <div className="BtnGroup">
                    <button type="button" disabled={sizeChecked} className="productCartBtn" onClick={()=>{cartSave()}}>장바구니 담기
                    </button>
                    <button type="button" className="productSaveBtn">찜하기</button>
                </div>
                <div className="lastPrice">
                    <p>총 상품 금액</p>
                    <div>
                        <span>총 수량 <span>{quantityCount}개</span> / </span>
                        <span>{converPrice(quantityCount * result.price)}</span>
                    </div>
                </div>
            </form>
            {cartPopupShow === true ? <CartPopup setCartPopupShow={setCartPopupShow}/> : null}
            {reCartPopupShow === true ? <ReCartPopup setReCartPopupShow={setReCartPopupShow}/> : null}
        </div>
    )
}
function CartPopup({setCartPopupShow}) {
    return(
        <div className="popupCartShow">
            <div className="popupCartContainer">
                <button onClick={()=>{setCartPopupShow(false)}}>닫기</button>
                <div>
                    <p>해당상품이 장바구니함에 담겼습니다.</p>
                    <Link href={'#'}>장바구니함 이동</Link>
                </div>
            </div>
        </div>
    )
}
function ReCartPopup({setReCartPopupShow}) {
    return(
        <div className="popupCartShow">
            <div className="popupCartContainer">
                <button onClick={()=>{setReCartPopupShow(false)}}>닫기</button>
                <div>
                    <p>해당상품이 이미 장바구니에 담겨져있습니다. 수량만 증가되었습니다.</p>
                    <Link href={'#'}>장바구니함 이동</Link>
                </div>
            </div>
        </div>
    )
}