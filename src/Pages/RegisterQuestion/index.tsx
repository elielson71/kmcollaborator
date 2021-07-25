import { useState } from 'react';
import { QuestionData } from '../../components/QuestionData'
import { Question } from '../../components/Question'
import './styles.scss'
import { Button } from '../../components/Button';

type QuestionsType = {
    idQuestion: number,
    title: string,
    content: string

}

export function RegisterQuestion() {

    const [questions, setQuestions] = useState<QuestionsType[]>([]);


    if (questions.length === 0)
        setQuestions([{ idQuestion: 0, title: "elielson", content: "" }]);


    function addNovaPergunta(index: number) {
        //event.preventDefault();
        const itensCopy = Array.from(questions)

        itensCopy.push({ idQuestion: questions.length, title: "", content: "" });
        setQuestions(itensCopy);
    }
    function excluirPergunta(idQuestions: number) {

        const itensCopy = Array.from(questions)
        itensCopy.splice(idQuestions, 1)

        setQuestions(itensCopy);

    }


    return (
        <div id="register-question">
            <div className="container">
                <div className="row">
                    <div className="col-2" id="btn">

                    </div>
                    <h3 className="col-8">Cadastrar Nova Pergunta</h3>
                    <div className="col-2" id="btn">
                        <Button text="Finalizar " />
                    </div>
                </div>
            </div>
            <div className="questions">

                {

                    questions.map((question, index) => (
                        <Question
                            key={question.idQuestion}
                            onSubmit={() => addNovaPergunta(index)}
                            onExcluir={() => excluirPergunta(question.idQuestion)}
                        />
                    ))}
            </div>

        </div>


    )
}