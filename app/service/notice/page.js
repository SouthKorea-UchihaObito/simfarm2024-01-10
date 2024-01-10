import ServiceNavGnb from "../serviceNavGnb/page";
import '../../styles/service/service.scss'
export default function Notice(){
    return(
        <main className="notice">
            <div className="noticeCenter">
                <ServiceNavGnb/>
                <div className="noticeRgiht">
                    <h3 className="noticeNamed">공지사항</h3>
                    <table className="noticeTable">
                        <caption>공지사항게시판</caption>
                        <colgroup>
                            <col width='5%'/>
                            <col width='75%'/>
                            <col width='10%'/>
                            <col width='5%'/>
                            <col width='5%'/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>날짜</th>
                                <th>작성자</th>
                                <th>조회</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td className="tabelContent">공지입니다.</td>
                                <td>2023.10.01</td>
                                <td>관리자</td>
                                <td>5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}