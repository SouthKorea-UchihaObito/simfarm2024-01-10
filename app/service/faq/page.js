import ServiceNavGnb from "../serviceNavGnb/page";
import '../../styles/service/service.scss'
export default function Faq() {
    return (
        <main className="faq">
            <div className="faqCenter">
                <ServiceNavGnb/>
                <div className="faqRgiht">
                    <h3 className="faqNamed">자주묻는질문</h3>
                </div>
            </div>
        </main>
    )
}