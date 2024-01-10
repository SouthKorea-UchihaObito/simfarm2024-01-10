import ServiceNavGnb from "../serviceNavGnb/page";
import '../../styles/service/service.scss'
export default function Qa(){
    return(
        <main className="qa">
            <div className="qaCenter">
                <ServiceNavGnb/>
                <div className="qaRgiht">
                    <h3 className="qaNamed">1:1문의</h3>
                </div>
            </div>
        </main>
    )
}