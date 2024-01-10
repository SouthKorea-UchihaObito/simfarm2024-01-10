'use client'
import { useEffect, useState } from "react";
import BackBtn from "./backBtn";
export default function BestQaGroup() {
    let [titleValid, setTitleValid] = useState(null) // 제목 값
    let [contentValid, setContentValid] = useState(null) // 문의사항 값
    let [inputValid, setInputValid] = useState(true) // 제목 값 + 문의사항 값 체크 여부
    const handleTitle = (e) => {
        if(e.target.value !== ''){
            setTitleValid(true)
        } else {
            setTitleValid(false)
        }
    }
    const handlecontent = (e) => {
        if(e.target.value !== ''){
            setContentValid(true)
        } else {
            setContentValid(false)
        }
    }
    useEffect(()=>{
        if(titleValid && contentValid){
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    },[titleValid, contentValid])
    return (
        <div className="bestQaGroup">
            <div className="bestQaTitleGroup">
                <label htmlFor="bestqaTitle">제목</label>
                <input type="text" id="bestqaTitle" name="bestqaTitle" placeholder="제목을 입력해주세요." defaultValue={titleValid}
                onChange={(e)=>{handleTitle(e)}}/>
            </div>
            <div>
                <label htmlFor="bestqaContent">문의내용</label>
                <textarea id="bestqaContent" name="bestqaContent" placeholder={"1. 상품과 관련없는 문의 사항은 답변이 어렵습니다..\r\n" +  "2. 상품에 대한 정보를 자세하기 기재해주시면 보다 신속한 답변 서비스를 이용하실 수 있습니다.\r\n" + "3. 욕설은 바로 삭제 됩니다.\r\n" + "4. 제목, 문의사항 모두 입력하셔야 합니다."} defaultValue={contentValid}
                onChange={(e)=>{handlecontent(e)}}></textarea>
            </div>
            <div className="bestQaBtnGroup">
                <BackBtn/>
                <button type="submit" disabled={inputValid}>전송</button>
            </div>
        </div>
    )
}