import { Dispatch, SetStateAction, useState } from "react"
import { typeAnswer, typeQuestions } from "../../components/Interface"

export function useNavegacao(dataQuestions:typeQuestions[],
    setItemQuestions:Dispatch<SetStateAction<typeQuestions>>,
    setAnswers:Dispatch<SetStateAction<typeAnswer[]>>,saveQuestions:any
    ){
        const [paginacao, setPaginacao] = useState(1)

    async function carregarOneQuestion(p: number) {
        if (dataQuestions[p]) {
            setItemQuestions(dataQuestions[p])
            const ans = dataQuestions[p].answers
            if (ans){
                setAnswers(ans)
            }
        }
    }
    function nextQuestion() {
        if (!saveQuestions(true))
            return
        if (paginacao < dataQuestions.length) {
            setPaginacao(pre => pre + 1)
            carregarOneQuestion(paginacao)
        }
    }
    function backQuestion(pag: number) {
        if (pag >= 0) {
            const p = pag - 1
            setPaginacao(p)
            carregarOneQuestion(p - 1)
        }
    }
    return {backQuestion,nextQuestion,setPaginacao,paginacao}
}