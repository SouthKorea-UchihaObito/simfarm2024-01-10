'use client'
import Link from "next/link"
export default function ListItem({result}){
    return(
        <div className="listGroup">
            {
                result.map((a, i)=>{
                    return(
                        <div className="list-item" key={i}>
                            <h4>
                                <Link href={"/detail/"+[result[i]._id]}>{result[i].title}</Link> 
                            </h4>
                            {/* <DetailLink/> */}
                            <p>{result[i].content}</p>
                            <span className="writer"><span><b>작성자</b> :</span>  {result[i].author}</span><br/>
                            <Link href={'/edit/'+[result[i]._id]}>수정</Link>
                            <button onClick={(e)=>{
                                fetch('/api/post/delete', {
                                    method : 'POST',
                                    body : result[i]._id
                                }).then((r)=>{
                                    if(r.status === 200){
                                        console.log(r.status)
                                        e.target.parentElement.style.opacity = 0;
                                        setTimeout(()=>{
                                            e.target.parentElement.style.display = 'none'
                                        },1000)
                                    } else {
                                        console.log(r.status)
                                    }
                                }).catch((error)=>{ // 인터넷 문제로 실패 시 실행할 코드
                                    console.log(error)
                                })
                                //fetch('/api/abc/kim') // 데이터 전송 query string ! 
                                // GET 요청 데이터 많으면 단점 ! 민감한 정보는 안됨 !
                            }}>삭제</button>
                        </div>
                    )
                })
            }
        </div>
    )
}