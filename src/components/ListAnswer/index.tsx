import { typeAnswer } from '../Interface'
import './styles.scss'

type propsLista = {
    answer: typeAnswer
    setAnswer: React.Dispatch<React.SetStateAction<typeAnswer[]>>
    typeQuestions: string
    handleAddAnswer: any,
    handleDeleteAnswer: any;
    handleChangeAnswer: any;
    handleChangeTrueAnswer: any;
}
export function ListAnswer({ answer, setAnswer, typeQuestions, handleDeleteAnswer, handleChangeAnswer, handleAddAnswer, handleChangeTrueAnswer }: propsLista) {
    const done = (value: string) => {
        handleChangeAnswer(answer.idAnswer, value)
    }
    const handleTypeAnswer = (type: string, isTrue: boolean) => {
        switch (type) {
            case "R": return (
                <div className="form-check">
                    <input
                        defaultValue=""
                        className="form-check-input"
                        type="radio" name={`flexRadioDefault`} id="flexRadioDefault1"
                        onChange={e => handleChangeTrueAnswer(answer.idAnswer, e.target.checked)}
                        checked={isTrue}
                    />
                </div>
            );
            case "C": return (
                <div className="form-check">
                    <input
                        className="form-check-input"
                        defaultValue=""
                        type="checkbox"
                        id="flexCheckIndeterminate"
                        onChange={e => handleChangeTrueAnswer(answer.idAnswer, e.target.checked)}
                        checked={isTrue}
                    />
                </div>)
            default: return false;
        }
    }

    return (
        <div className="add-answer">
            <div id="list-answer">
                {handleTypeAnswer(typeQuestions, answer.isTrue)}
                {
                    <input
                        autoFocus
                        className="answer-input"
                        type="text"
                        disabled={
                            typeQuestions === "B" || typeQuestions === "L"
                        }
                        placeholder={typeQuestions === "B" || typeQuestions === "L" ? "" : "Digite a Resposta"}
                        onChange={e => { setAnswer(prev => prev.map(item => item.idAnswer === answer.idAnswer ? { ...item, descricao: e.target.value } : item)); }}
                        onBlur={e => done(e.target.value)}
                        value={typeQuestions === "B" ? "Resposta Curta ---" : typeQuestions === "L" ? "Resposta Longa ---------" : answer.descricao}
                    />

                }

                <div className="button" hidden={typeQuestions === "B" || typeQuestions === "L"}>
                    <button onClick={() => { handleAddAnswer(answer.idAnswer, answer.descricao, typeQuestions) }} ><i className="fas fa-plus-circle " aria-hidden="true"></i></button>
                    <button ><i className="far fa-images"></i></button>
                    <button className="button" onClick={() => handleDeleteAnswer(answer.idAnswer)}><i className="far fa-times-circle"></i></button>
                </div>


            </div>
        </div >

    )
}