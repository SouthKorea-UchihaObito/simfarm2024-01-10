'use client'
import { useEffect, useState } from "react"
export default function PostLike(props){
    let [heart, setHeart] = useState()
    let [likeCount, setLikeCount] = useState()
    let [likeUserList, setLikeUserList] = useState()
    let [whether, setWhether] = useState()
    useEffect(()=>{
        fetch('/api/like/userList?id=' + props._id)
        .then((response)=>{
            if(response.status === 200){
                return response.json()  
            } else {
                return response.json()
            }
        }).then((result)=>{
            setWhether(result[0])
            setHeart(result[1])
            console.log(whether)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])
    useEffect(()=>{
        fetch('/api/like/count?id=' + props._id) // GET 방식으로 서버로 데이터 전송함과 동시에 요청하는 코드
        .then((response)=>{
            if(response.status === 200){
                return response.json()  
            } else {
                return response.json()
            }
        }).then((result)=>{
            setLikeUserList(result.likeUser)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    useEffect(()=>{
        fetch('/api/like/count?id=' + props._id)
        .then((response)=>{
            if(response.status === 200){
                return response.json()  
            } else {
                return response.json()
            }
        }).then((result)=>{
            setLikeCount(result.postLikeCount)
        }).catch((error)=>{
            console.log(error)
        })
    },[likeCount])
    let [trg, setTrg] = useState(false)
    let res = null
    return(
        <div>
            <div>
                <div>
                    <span>좋아요</span>
                    <button onClick={(e)=>{
                        {
                            if(whether === false){ // 좋아요 안눌러저 있을 때
                                console.log('좋아요 안눌러져 있을 때')
                                fetch('/api/like/likePlus',{
                                    method : "POST",
                                    body : JSON.stringify({likeCount : likeCount, _id : props._id, name : props.name})
                                }).then((response)=>{
                                    if(response.status === 200){
                                        res = true
                                        return response.json()
                                    } else {
                                        res = false
                                        return response.json()
                                    }
                                }).then((result)=>{
                                    if(res === true){ // 로그인 세션 존재 하면
                                        setWhether(true)
                                        setHeart(result[0])
                                        setLikeUserList(result[1])
                                        setLikeCount(result[2])
                                        console.log(whether)
                                        console.log('좋아요 체크')
                                    } else { // 로그인 세션 존재 하지 않으면
                                        setErr('권한이 없습니다.')
                                    }
                                }).catch((error)=>{
                                    console.log(error)
                                })
                            } else if(whether === true){ // 좋아요 눌러저 있을 떄
                                console.log('좋아요 눌러져 있을 때')
                                fetch('/api/like/likeMinus', {
                                    method : "POST",
                                    body : JSON.stringify({likeCount : likeCount, _id : props._id, name : props.name})
                                }).then((response)=>{
                                    if(response.status === 200){
                                        res = true
                                        return response.json()
                                    } else {
                                        res = false
                                        return response.json()
                                    }
                                }).then((result)=>{
                                    if(res === true){
                                        setWhether(false)
                                        setHeart(result[0])
                                        setLikeUserList(result[1])
                                        setLikeCount(result[2])
                                        console.log(whether)
                                        console.log('좋아요 취소')
                                    } else {
                                        setErr('권한이 없습니다.')
                                    }
                                }).catch((error)=>{
                                    console.log(error)
                                })
                            }
                        }
                    }}>{heart}</button>
                     {likeCount < 1 ? null : <p>{likeCount} 명이 좋아합니다.</p>}
                </div>
                {likeCount < 1 ? null : <button onClick={()=>{
                    setTrg(!trg)
                }}>좋아요 목록</button>}
                {/* {err === false ? null : <ErrPopup err={err} />  } */}
            </div>
            {trg === false ? null : <ListOne likeUserList={likeUserList}/>} 
        </div>
    )
}
function ListOne(props){
    return(
        <div>
            <ul>
                {
                    props.likeUserList.map((a, i)=>{
                        return(
                            <li key={i}>{a}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
function ErrPopup(props){
    return(
        <div>
            {props.err}
        </div>
    )
}