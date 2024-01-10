import ServiceNavGnb from "../serviceNavGnb/page";
import '../../styles/service/service.scss'
export default function Event(){
    return (
        <main className="event">
            <div className="eventCenter">
                <ServiceNavGnb/>
                <div className="eventRgiht">
                    <h3 className="eventNamed">이벤트</h3>
                </div>
            </div>
        </main>
    )
}