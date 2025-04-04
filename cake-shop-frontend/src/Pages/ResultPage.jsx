import { useParams } from "react-router-dom";

function ResultPage() {
    const { success } = useParams();

    return success ? <div>success</div> : <div>failed</div>
}

export default ResultPage;