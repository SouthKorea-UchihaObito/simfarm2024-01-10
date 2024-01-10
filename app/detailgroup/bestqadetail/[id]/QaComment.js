'use client'
import { useEffect, useState } from "react"
import PrevBtn from "./prevBtn"
export default function QaComment(props){
    let [comment, setComment] = useState('')
    let [commentData, setCommentData] = useState([])
    useEffect(()=>{
        fetch('/api/bestqaComment/commentList?id=' + props._id)
        .then((response)=>{
            return response.json()
        }).then((result)=>{
            setCommentData(result)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    return (
        <div className="bestQaComment">
            {
                commentData.length > 0  ?
                commentData.map((item, index)=>{
                    return(
                        <div className="bestQaCommentBox" key={index}>
                            <div>
                                <span>{item.name}</span>
                                <span>{item.date}</span>
                            </div>
                            <p>{item.content}</p>
                        </div>
                    )
                })
                : '댓글 불러오는중'
            }
            {
                props.session ?
                (
                    props.session.user.role === 'admin' ?
                    <div className="commentInputGroup">
                        <p>댓글입력</p>
                        <textarea onChange={(e)=>{
                            setComment(e.target.value)
                        }}/>
                    </div> : null
                ) : null
            }
            <div className="bestQaCommentFood">
                <PrevBtn />
                {
                    props.session ?
                    (
                        props.session.user.role === 'admin' ?
                        <button type="button" onClick={()=>{
                            fetch('/api/bestqaComment/new', {method: "POST", body: JSON.stringify({comment : comment, _id : props._id})})
                            .then((response)=>{
                                return response.json()
                            }).then((result)=>{
                                setCommentData([...result])
                            }).catch((error)=>{
                                console.log(error)
                            })
                        }}>등록</button> : null
                    ) : null
                }
            </div>
        </div>
    )
}