'use client'
import { useEffect, useState } from "react"
export default function Comment(props){
    let [comment, setComment] = useState('')
    let [data, setData] = useState([])
    useEffect(()=>{ // fetch 는 use client 안에서는 단독으로 사용되지 않고 useEffect 안에서 사용가능 보통 ajax , 타이머 넣음
        fetch('/api/comment/test?id=' + props._id) // GET 방식으로 서버로 데이터 전송함과 동시에 요청하는 코드
        .then((response)=>{
            return response.json()
        }).then((result)=>{
            setData(result)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    return (
        <div className="detailComment">
            {
                data.length > 0 ?
                data.map((a, i)=>{
                    return(
                        <div className="detailCommentBox" key={i}>
                            <div>
                                {/* <strong>댓글작성자</strong> : {a.author} */}
                                <strong>{a.author_name}</strong><span>{a.author}</span>
                                {/* <span><strong>닉네임</strong> : {a.author_name}</span> */}
                            </div>
                            <p>{a.content}</p>
                        </div>
                    )
                })
                : '댓글목록을 불러오는 중입니다.'
            }
            <div className="commentInputZone">
                <p>댓글 입력</p>
                <textarea name="content" onChange={(e)=>{setComment(e.target.value)}} type="text"/>
            </div>
            <div className="commentBtnBox">
                <button onClick={()=>{
                    fetch('/api/comment/new', {
                        method : "POST",
                        body :JSON.stringify({comment : comment, _id : props._id})
                    }).then((response)=>{ 
                        if(response.status === 200){
                            return response.json()
                        } else {
                            console.log(response)
                        }
                    }).then((result)=>{
                        setData([...result])
                    }).catch((error)=>{
                        console.log(error)
                    })
                }}>댓글전송</button>
            </div>
        </div>
    )
}