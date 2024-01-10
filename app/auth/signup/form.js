'use client'
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useEffect, useState } from 'react';
import PrevBtn from './prevbtn'
import styles from '../../styles/api/signup.module.scss'
export default function Form(){
    const [postcodeValid, setPostCodeValid] = useState(false) // 우편번호, 주소 입력값 입력 여부를 state에 담음

    let [zonecode, setZoneCode] = useState('') // 우편번호 반환 받을 곳
    let [address, setAddress] = useState('') // 주소 반환 받을 곳
    const open = useDaumPostcodePopup(postcodeScriptUrl);
    const handleComplete = (data) => {
        let addr = ''; // 주소 변수
        let extraAddr = ''; // 참고항목 변수
        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
        }
        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
        }
        setZoneCode(data.zonecode)
        setAddress(addr)
        setPostCodeValid(true) // 주소 찾기를 통하여 주소를 받으면 우편번호, 주소 입력값 여부 true
    };
    const handleClick = () => {
        open({ onComplete: handleComplete });
    };
    const [name, setName] = useState('')
    const [nameValid, setNameValid] = useState(false)

    const [email, setEmail] = useState('')
    const [eamilValid, setEmailValid] = useState(false)

    const [pw, setPw] = useState('')
    const [pwValid, setPwValid] = useState(false)

    const [rePw, setRePw] = useState('')
    const [rePwValid, setRePwValid] = useState(false)

    const [tel, setTel] = useState('')
    const [telValid, setTelValid] = useState(false)

    const [notAllow, setNotAllow] = useState(true) // 전송버튼 disabled 상태

    const handleName = (e) => { // 한글 이름 규격 확인
        setName(e.target.value)
        const regex = /^[가-힣]{2,4}$/;
        if(regex.test(e.target.value)){
            setNameValid(true)
        } else {
            setNameValid(false)
        }
    }
    const handleEmail = (e) =>{ // Email 규격 확인
        setEmail(e.target.value)
        const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if(regex.test(e.target.value)){
            setEmailValid(true)
        } else {
            setEmailValid(false)
        }
    }
    const handlePassword = (e) => { // 패스워드 규정 여부 확인
        setPw(e.target.value)
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/g
        if(regex.test(e.target.value)){
            setPwValid(true)
        } else {
            setPwValid(false)
        }
    }
    const handleRePassword = (e) => { // 패스워드 일치 여부 확인
        setRePw(e.target.value)
        if(e.target.value === pw){
            setRePwValid(true)
        } else {
            setRePwValid(false)
        }
    }
    const handlePostcode = (e) => { // 휴대폰번호 규격 확인
        if(e.target.value !== ''){
            setPostCodeValid(true)
        } else {
            setPostCodeValid(false)
        }
    }
    const handleTel = (e) => { // 휴대폰번호 규격 확인
        setTel(e.target.value)
        const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
        if(regex.test(e.target.value) && e.target.value.length >= 11){
            setTelValid(true)
        } else {
            setTelValid(false)
        }
    }
    useEffect(()=>{ // 한글, 이메일, 패스워드, 휴대폰번호 규격 일치한다면 가입 전송버튼 활성화 각 이벤트 요소가 렌더링 될 때마다
        if(eamilValid && pwValid && rePwValid && postcodeValid && telValid){
           setNotAllow(false)
           return
        } 
        setNotAllow(true)
    }, [eamilValid, pwValid, rePwValid, postcodeValid, telValid])
    return(
        <form action="/api/auth/signup" method="POST">
            <div>
                <label htmlFor='name'>이름<span>▣</span></label>
                <input id="name" name="name" type="text" required placeholder="이름을 입력해주세요."
                onChange={handleName}/>
            </div>
            <p className={styles.guideText}>
                {!nameValid && name.length > 0 && (<span style={{color:"red"}}>한글만 입력 가능합니다.</span>
                )}
            </p>
            <div className={styles.emailZone}>
                <label htmlFor='email'>이메일<span>▣</span></label>
                <input id="email" type="email" name="email" value={email} required placeholder="이메일을 입력해주세요."
                    onChange={handleEmail}
                />
            </div>
            <p className={styles.guideText}>
                {!eamilValid && email.length > 0 ? (
                    <span style={{color:"red"}}>올바른 이메일 형식이 아닙니다.</span>
                ) : (<span>이메일 형식 예&#41; id@naver.com</span>)}
            </p>
            <div>
                <label htmlFor='password'>비밀번호<span>▣</span></label>
                <input id="password" type="password" name="password" value={pw} required placeholder="비밀번호를 입력해주세요."
                onChange={handlePassword}/>
            </div>
            <p className={styles.guideText}>
                {!pwValid && pw.length > 0 && (
                    <span style={{color:"red"}}>영문, 숫자, 특수문자 포함 최소 8자 ~ 20자 이내로 입력해주세요.</span>)
                }
            </p>
            <div>
                <label htmlFor='passwordOk'>비밀번호 확인<span>▣</span></label>
                <input id="passwordOk" type="password" value={rePw} required placeholder="비밀번호를 한번 더 입력해주세요."
                onChange={handleRePassword}/>
            </div>
            <p className={styles.errText}>
                {!rePwValid && rePw.length > 0 && (<span style={{color:"red"}}>비밀번호가 일치하지 않습니다.</span>)}
            </p>
            <div className={styles.addressZone}>
                <label htmlFor='address'>주소<span>▣</span></label>
                <div>
                    <input id="postcode" type="text" name="postcode" placeholder="우편번호" defaultValue={zonecode} required readOnly/>
                    <button type='button' onClick={handleClick}>주소 검색</button>
                </div>
            </div>
           
            <div className={styles.mainAddressZone}>
                <input id="address" type="text" name="address" placeholder="주소" defaultValue={address} required readOnly/>
            </div>
            <p className={styles.errText}>
                {zonecode === '' && address === '' ? (
                    <span>주소를 기입해주세요.</span>
                ) : null}
            </p>
            <div className={styles.detailZone}>
                <input type="text" name="detailAddress" required placeholder="상세주소"/>
            </div>
            <div>
                <label htmlFor='tel'>전화번호<span>▣</span></label>
                <input id="tel" type="text" name="tel" value={tel} required placeholder="전화번호" maxLength="11"
                onChange={handleTel}/>
            </div>
            <p className={styles.guideText}>
                {!telValid && tel.length > 0 ? (<span>올바른 휴대폰번호 양식이 아닙니다.</span>)
                : (<span>'-' 없이 작성해주세요 </span>)}
            </p>
            <div>
                <label htmlFor='year'>생년월일<span>▣</span></label>
                <input id="year" type="date" name="year" required placeholder="생년월일을 입력해주세요."/>
            </div>
            <div className={styles.smstypeBox}>
                <input id='smsAll' className='checkbox' type='checkbox'/>
                <label htmlFor='smsAll' className='checkbox'><i/>쇼핑정보 수신 전체 동의 <span>(선택)</span></label>
            </div>
            <div className={styles.smstypeBox}>
                <input id='sms' className='checkbox' type='checkbox'/>
                <label htmlFor='sms' className='checkbox'><i/>SMS 수신 동의 <span>(선택)</span></label>
            </div>
            <div className={styles.smstypeBox}>
                <input id='emailSms' className='checkbox' type='checkbox'/>
                <label htmlFor='emailSms' className='checkbox'><i/>이메일 수신 동의 <span>(선택)</span></label>
            </div>
            <div className={styles.clause}>
                <h5>제 1조 (목적)</h5>
                <p>
                    표준 약관 제XXX호
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
                    우리는 도르레 산들림 사과 노트북 도서관 나래 포도 가온해 아리아 바람꽃.
                </p>
            </div>
            <div className={styles.btnZone}>
                <PrevBtn/>
                <button disabled={notAllow} type="submit" onClick={()=>{
                    
                }}>전송</button>
            </div>
        </form>
    )
}