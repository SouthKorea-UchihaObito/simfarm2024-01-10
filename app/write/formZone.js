'use client'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/api/write.module.scss'
import Image from 'next/image'
import notImage from '/public/image/write/notImage.svg'
export default function FormZone(){
    let [imageName, setImageName] = useState('파일이름')
    let [src, setSrc] = useState('') // 이미지 URL
    let [resData, setResData] = useState() //
    let [dataFo, setDataFo] = useState(null)
    let [resultUrl, setResultUrl] = useState('')
    let [fileImage, setFileImage] = useState(null)
    /* input 에 값 들어가있는지 체크 state */
    let [titleValid, setTitleValid] = useState(false) // 제목 입력 값 여부 확인 state
    let [contentValid, setContentValid] = useState(false) // 내용 입력 값 여부 확인 state
    let [filedValid, setFiledValid] = useState(false) // 파일 업로드 여부 확인
    let [notAllow, setNotAllow] = useState(true) // 모든 입력 값 여부 확인 state
    /* end input 에 값 들어가있는지 체크 state */
    let imageInput = useRef()
    const onClickImageUpload = () => {
        imageInput.current.click()
    }
    const handlerChange = async (e) => {
        let file = e.target.files[0] // 이미지 파일명
        let filename = encodeURIComponent(file.name) // file.name -> 유저가 선택한 이미지 이름 남음 / encodeURIComponent -> 간혹 한글 파일명은 깨질 때 있음 깨질 경우 방지(인코딩해줌)
        let reg = /(.*?)\.(jpg|bmp|jpeg|png)$/
        if(e.target.value === '' && e.target.value.match(reg) !== null || reg.test(e.target.value) !== false){ 
            console.log('맞음')
            if(file){ // createObjectURL
                setFiledValid(true)
                const imageUrl = URL.createObjectURL(file)
                setFileImage(imageUrl)    

                let res = await fetch('/api/post/image?file=' + filename)
                res = await res.json()
                console.log(res.url)
                console.log(filename)
                //S3 업로드
                const formData = new FormData()
                Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                    formData.append(key, value)
                })
                // console.log(file)
                // console.log(filename)
                setResData(res.url) // aws 로 POST 요청 보낼 주소
                setDataFo(formData) // FormData 담아둠
                setResultUrl(res.url + '/' + filename)
            } 
        } else {
            setFiledValid(false)
            setFileImage(notImage)
        }
        setImageName(e.target.files[0].name)
    }
    const handleTitle = (e) => {
        if(e.target.value !== ''){
            setTitleValid(true)
        } else {
            setTitleValid(false)
        }
    }
    const handleContent = (e) => {
        if(e.target.value !== ''){
            setContentValid(true)
        } else {
            setContentValid(false)
        }
    }
    const handleFile = (e) => {
        if(e.target.value !== ''){
            setTitleValid(true)
        } else {
            setTitleValid(false)
        }
    }
    useEffect(()=>{
        if(titleValid && contentValid && filedValid){
            setNotAllow(false)
            return
        } 
        setNotAllow(true)
    }, [titleValid, contentValid, filedValid])

    const onformdata = async (e) =>{
        let uploadResult = await fetch(resData, {
            method: 'POST',
            body: dataFo,
        })
    }
    return(
        <form action="/api/post/new" method="POST" onSubmit={onformdata}>
            <div className={styles.textTitleZone}>
                <label htmlFor="title">글 제목</label>
                <input id="title" type="text" required name="title" onChange={handleTitle}/>
            </div>
            <div className={styles.textContentZone}>
                <label htmlFor="content">글 내용</label>
                <input id="content" type="text" required name="content" onChange={handleContent}/>
            </div>
            <div className={styles.fileZone}>
                <div className={styles.imageFull}>
                    {fileImage && <Image src={fileImage} alt='Preview' width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto', borderRadius:'5px'}} />}
                </div>
                <div className={styles.fileApiBox}>
                    <label htmlFor="file">{imageName}</label>
                    <input id="file" name="file" type="file" accept='image/*' ref={imageInput} required onChange={
                        handlerChange
                    }/>
                    <button type='button' onClick={onClickImageUpload}>파일찾기</button>
                </div>
            </div>
            <input type='hidden' id='urlData' name='urlData' defaultValue={resData}/>
            <input type='hidden' id='resultUrl' name='resultUrl' defaultValue={resultUrl}/>
            <button disabled={notAllow} type="submit">전송</button>
        </form>
    )
}