'use client'
import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/api/agreement.module.scss'
import NextBtn from './nextbtn'
import PrevBtn from './prevbtn'
import { useRouter } from 'next/navigation'
import btnImage from '../../../public/image/btn/btn_arrow.svg'
import Image from 'next/image'
export default function Check(){
    let agreeInfo = [
        {id : 0, title : "이용약관 동의", content : `준 약관 제XXX호
        이 약관은 XXX(전자거래 사업자)가 운영하는 등의
        심팜팜 공식몰testtest
        이플 여우별 노트북 별하 함초롱하다 늘품 나비잠 도담도담
        이플 늘품 여우별 그루잠 나비잠 함초롱하다 포도 달볓 아련 아슬라
        소솜 도담도담 안녕 도서 바람꽃 가온누리 안녕 달볓 아련 안녕
        도담도담 아련 예그리나 노트북 우리는 미리내 소솜 산들림 가온해
        곰다시 별빛 별빛 바람꽃 비나리 도서 비나리 늘품 나비잠 함초롱하다 여우비 포도 아리아.
        책방 아름드리 바나나 소솜 노트북 바나나 가온해 아리아 바나나
        별빛 책방 사과 옅구름 가온누리 책방 이플 도서관 가온누리 여우별
        리내 비나리 함초롱하다 감또개 사과 감사합니다 책방 산들림 도서 컴퓨터
        비나리 컴퓨터 곰다시 포도 도르레 산들림 미쁘다 별하 나래 도르레 안녕
        미리내 바람꽃 안녕 소솜 컴퓨터 나비잠 사과 산들림 미리내 나비잠.
        산들림 감또개 함초롱하다 아슬라 소솜 비나리 감사합니다 바람꽃 달볓 아리아 별빛 바람꽃
        도담도담 감또개 아련 우리는 노트북 미리내 나래 바람꽃 그루잠 아련 미리내 도담도담
        여우비 늘품 나래 예그리나 곰다시 도르레 가온해 예그리나 별하 감사합니다 포도
        가온해 예그리나 책방 도서 아리아 아리아 아련 컴퓨터 옅구름 우리는 감사합니다 책방 여우비 함초롱하다 감또개.
        나래 노트북 안녕 사과 가온해 곰다시 산들림 달볓 아련 안녕 별하 컴퓨터 별하
        비나리 소록소록 별하 책방 달볓 도담도담 바나나 이플 가온누리 옅구름 책방 옅구름 노트북
        미쁘다 이플 여우별 아리아 미리내 나래 우리는 아슬라 비나리 바나나
        그루잠 아름드리 사과 바나나 가온누리 다솜 로운 가온해 미리내 이플 다솜 그루잠 미리내 별하.
        나비잠 나비잠 소록소록 아름드리 별빛 함초롱하다 다솜 로운 도서관
        함초롱하다 컴퓨터 도서관 가온해 도담도담 미리내 이플 도담도담 아련
        감사합니다 감사합니다 도서관 포도 감또개 포도 다솜 옅구름 사과 도담도담
        바람꽃 안녕 로운 아련 나래 미쁘다 아리아 여우별 도서 그루잠 아리아`},
        {id : 1, title : "개인정보 수집 및 이용 동의", content : `준 약관 제XXX호
        이 약관은 XXX(전자거래 사업자)가 운영하는 등의
        심팜팜 공식몰testtest
        이플 여우별 노트북 별하 함초롱하다 늘품 나비잠 도담도담
        이플 늘품 여우별 그루잠 나비잠 함초롱하다 포도 달볓 아련 아슬라
        소솜 도담도담 안녕 도서 바람꽃 가온누리 안녕 달볓 아련 안녕
        도담도담 아련 예그리나 노트북 우리는 미리내 소솜 산들림 가온해
        곰다시 별빛 별빛 바람꽃 비나리 도서 비나리 늘품 나비잠 함초롱하다 여우비 포도 아리아.
        책방 아름드리 바나나 소솜 노트북 바나나 가온해 아리아 바나나
        별빛 책방 사과 옅구름 가온누리 책방 이플 도서관 가온누리 여우별
        리내 비나리 함초롱하다 감또개 사과 감사합니다 책방 산들림 도서 컴퓨터
        비나리 컴퓨터 곰다시 포도 도르레 산들림 미쁘다 별하 나래 도르레 안녕
        미리내 바람꽃 안녕 소솜 컴퓨터 나비잠 사과 산들림 미리내 나비잠.
        산들림 감또개 함초롱하다 아슬라 소솜 비나리 감사합니다 바람꽃 달볓 아리아 별빛 바람꽃
        도담도담 감또개 아련 우리는 노트북 미리내 나래 바람꽃 그루잠 아련 미리내 도담도담
        여우비 늘품 나래 예그리나 곰다시 도르레 가온해 예그리나 별하 감사합니다 포도
        가온해 예그리나 책방 도서 아리아 아리아 아련 컴퓨터 옅구름 우리는 감사합니다 책방 여우비 함초롱하다 감또개.
        나래 노트북 안녕 사과 가온해 곰다시 산들림 달볓 아련 안녕 별하 컴퓨터 별하
        비나리 소록소록 별하 책방 달볓 도담도담 바나나 이플 가온누리 옅구름 책방 옅구름 노트북
        미쁘다 이플 여우별 아리아 미리내 나래 우리는 아슬라 비나리 바나나
        그루잠 아름드리 사과 바나나 가온누리 다솜 로운 가온해 미리내 이플 다솜 그루잠 미리내 별하.
        나비잠 나비잠 소록소록 아름드리 별빛 함초롱하다 다솜 로운 도서관
        함초롱하다 컴퓨터 도서관 가온해 도담도담 미리내 이플 도담도담 아련
        감사합니다 감사합니다 도서관 포도 감또개 포도 다솜 옅구름 사과 도담도담
        바람꽃 안녕 로운 아련 나래 미쁘다 아리아 여우별 도서 그루잠 아리아 `},
        {id : 2, title : "심팜팜 최신정보, 마케팅 혜택정보 받기", content : `준 약관 제XXX호
        이 약관은 XXX(전자거래 사업자)가 운영하는 등의
        심팜팜 공식몰testtest
        이플 여우별 노트북 별하 함초롱하다 늘품 나비잠 도담도담
        이플 늘품 여우별 그루잠 나비잠 함초롱하다 포도 달볓 아련 아슬라
        소솜 도담도담 안녕 도서 바람꽃 가온누리 안녕 달볓 아련 안녕
        도담도담 아련 예그리나 노트북 우리는 미리내 소솜 산들림 가온해
        곰다시 별빛 별빛 바람꽃 비나리 도서 비나리 늘품 나비잠 함초롱하다 여우비 포도 아리아.
        책방 아름드리 바나나 소솜 노트북 바나나 가온해 아리아 바나나
        별빛 책방 사과 옅구름 가온누리 책방 이플 도서관 가온누리 여우별
        리내 비나리 함초롱하다 감또개 사과 감사합니다 책방 산들림 도서 컴퓨터
        비나리 컴퓨터 곰다시 포도 도르레 산들림 미쁘다 별하 나래 도르레 안녕
        미리내 바람꽃 안녕 소솜 컴퓨터 나비잠 사과 산들림 미리내 나비잠.
        산들림 감또개 함초롱하다 아슬라 소솜 비나리 감사합니다 바람꽃 달볓 아리아 별빛 바람꽃
        도담도담 감또개 아련 우리는 노트북 미리내 나래 바람꽃 그루잠 아련 미리내 도담도담
        여우비 늘품 나래 예그리나 곰다시 도르레 가온해 예그리나 별하 감사합니다 포도
        가온해 예그리나 책방 도서 아리아 아리아 아련 컴퓨터 옅구름 우리는 감사합니다 책방 여우비 함초롱하다 감또개.
        나래 노트북 안녕 사과 가온해 곰다시 산들림 달볓 아련 안녕 별하 컴퓨터 별하
        비나리 소록소록 별하 책방 달볓 도담도담 바나나 이플 가온누리 옅구름 책방 옅구름 노트북
        미쁘다 이플 여우별 아리아 미리내 나래 우리는 아슬라 비나리 바나나
        그루잠 아름드리 사과 바나나 가온누리 다솜 로운 가온해 미리내 이플 다솜 그루잠 미리내 별하.
        나비잠 나비잠 소록소록 아름드리 별빛 함초롱하다 다솜 로운 도서관
        함초롱하다 컴퓨터 도서관 가온해 도담도담 미리내 이플 도담도담 아련
        감사합니다 감사합니다 도서관 포도 감또개 포도 다솜 옅구름 사과 도담도담
        바람꽃 안녕 로운 아련 나래 미쁘다 아리아 여우별 도서 그루잠 아리아
        `}
    ]
    /* 체크박스 전체체크, 전체해제 부분 */
    // const [isAllChecked, setAllChecked] = useState(false)
    const [checkedState, setCheckedState] = useState(new Array(3).fill(false))

    const [btnData, setBtnData] = useState(true) // nextBtn disabled 상태
    const [checkedButtons, setCheckedButtons] = useState([]) //
    const changeHandler = (checked, id) => {
        if(checked){
            setCheckedButtons([...checkedButtons, id])
        } else {
            setCheckedButtons(checkedButtons.filter(button => button !== id))
        }
    }
    const router = useRouter()
    const isAllChecked = checkedButtons.length === 2;
    const disTrue = !isAllChecked;
    const disabled = !isAllChecked;

    const [useCom, setUseCom] = useState(false)
    const [privacyCom, setPrivacyCom] = useState(false)
    const [messageCom, setMessageCom] = useState(false)

    const [com1, setCom1] = useState('off')
    const [com2, setCom2] = useState('off')
    const [com3, setCom3] = useState('off')

    const transCom1 = (e) => {
        if(e.target.className === 'off'){
            setCom1('on')
        } else {
            setCom1('off')
        }
    }
    const transCom2 = (e) => {
        if(e.target.className === 'off'){
            setCom2('on')
        } else {
            setCom2('off')
        }
    }
    const transCom3 = (e) => {
        if(e.target.className === 'off'){
            setCom3('on')
        } else {
            setCom3('off')
        }
    }
    /* and 체크박스 전체체크, 전체해제 부분 */
    return(
        <main className={styles.agreement}>
            <h4>회원가입</h4>
            <div className={styles.step}>
                <span className={styles.on}>약관동의</span>
                <span>정보입력</span>
                <span>가입완료</span>
            </div>
            <div className={styles.consentComment}>
                <p><strong>이용약관 동의</strong>모든 약관을 확인하고 전체 동의합니다.</p>
            </div>
            <div>
                <input id='useCheck' className='checkbox' type='checkbox'
                checked={checkedButtons.includes('check') ? true : false}
                onChange={(e)=>{
                    changeHandler(e.currentTarget.checked, 'check')
                }}/>
                <label htmlFor='useCheck' className='checkbox'><i/>이용약관 동의 <span>(필수)</span></label>
                <div>
                    <span>전체보기 </span>
                    <button onClick={()=>{setUseCom(!useCom)}}>
                        <Image src={btnImage} alt='btnarrowImage' className={com1} width={15} style={com1 === 'off' ? {transform : 'rotate(0deg)'} : {transform : 'rotate(180deg)'}} 
                            onClick={(e)=>{
                            transCom1(e)}}
                        />
                    </button>
                </div> 
            </div>
            {useCom === true ? <AgreeCom agreeInfo={agreeInfo}/> : null}         
            <div>
                <input id='privacyCheck' className='checkbox' type='checkbox'
                checked={checkedButtons.includes('check2') ? true : false}
                onChange={(e)=>{
                    changeHandler(e.currentTarget.checked, 'check2');
                }}/>
                <label htmlFor='privacyCheck' className='checkbox'><i/>개인정보 수집 및 이용 동의 <span>(필수)</span></label>
                <div>
                    <span>전체보기 </span>
                    <button onClick={(e)=>{setPrivacyCom(!privacyCom)}}>
                        <Image src={btnImage} alt='btnarrowImage' className={com2} width={15} style={com2 === 'off' ? {transform : 'rotate(0deg)'} : {transform : 'rotate(180deg)'}} 
                            onClick={(e)=>{
                            transCom2(e)}}
                        />
                    </button>
                </div> 
            </div>
            {privacyCom === true ? <InfoeCom agreeInfo={agreeInfo}/> : null} 
            <div className={styles.messageContainer}>
                <input id='messageCheck' className='checkbox' type='checkbox'/>
                <label htmlFor='messageCheck' className='checkbox'><i/>심팜팜 최신정보, 마케팅 혜택정보 받기 <span>(선택)</span></label>
                <div>
                    <span>전체보기 </span>
                    <button onClick={(e)=>{setMessageCom(!messageCom)}}>
                        <Image src={btnImage} alt='btnarrowImage' className={com3} width={15} style={com3 === 'off' ? {transform : 'rotate(0deg)'} : {transform : 'rotate(180deg)'}} 
                            onClick={(e)=>{
                            transCom3(e)}}
                        />
                    </button>
                </div> 
            </div>
            {messageCom === true ? <MessageCom agreeInfo={agreeInfo}/> : null}
            <p style={disabled ? { display: 'block', color: 'red' } : { color: 'white' }}>필수 동의 항목에 동의하지않았습니다.</p>
            <div className={styles.btnZone}>
                <PrevBtn/>
                <button disabled={disabled} onClick={()=>{
                    router.push('/auth/signup',{disabled:disabled})
                }}>다음</button>
            </div>
        </main>
    )
}
function AgreeCom({agreeInfo}){
    return(
        <div className={styles.agreeContainer}>
            <div className={styles.agreeContent}>
                <h4>{agreeInfo[0].title}</h4>
                <p>
                    {agreeInfo[0].content}
                </p>
            </div>
        </div>
    )
}
function InfoeCom({agreeInfo}){
    return(
        <div className={styles.agreeContainer}>
            <div className={styles.agreeContent}>
                <h4>{agreeInfo[1].title}</h4>
                <p>
                    {agreeInfo[1].content}
                </p>
            </div>
        </div>
    )
}
function MessageCom({agreeInfo}){
    return(
        <div className={styles.agreeContainer}>
            <div className={styles.agreeContent}>
                <h4>{agreeInfo[2].title}</h4>
                <p>
                    {agreeInfo[2].content}
                </p>
            </div>
        </div>
    )
}