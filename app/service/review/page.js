import ServiceNavGnb from "../serviceNavGnb/page";
import '../../styles/service/service.scss'
export default function Review(){
    return(
        <main className="review">
            <div className="reviewCenter">
                <ServiceNavGnb/>
                <div className="reviewRgiht">
                    <h3 className="reviewNamed">리뷰</h3>
                </div>
            </div>
        </main>
    )
}