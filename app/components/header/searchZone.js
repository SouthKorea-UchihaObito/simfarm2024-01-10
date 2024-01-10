'use client'
export default function SearchZone(){
    return(
        <div className="searchZone">
            <form action='/'>
                <button type="button">닫기</button>
                <input type="search" defaultValue='Pink Shoes' name=''/>
                <button type="submit">검색</button>
            </form>
        </div>
    )
}