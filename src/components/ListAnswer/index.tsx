import {  useEffect, useState } from 'react';
import './styles.scss'

type propsLista = {
    idQuestion: number,
    idAnswer:number,
    typeQuestions: string,
    content:string,
    handleAddAnswer:any,
    handleDeleteAnswer: any;
    handleChangeAnswer: any;

}
export function ListAnswer({ idQuestion,idAnswer, typeQuestions,content, handleDeleteAnswer, handleChangeAnswer, handleAddAnswer }: propsLista) {
    const [editingAnswes, setEditingAnswer] = useState<boolean>(false)

    const edit = () => setEditingAnswer(true);
    const done = (value: string) => {
        setEditingAnswer(false);
        handleChangeAnswer(idAnswer,idQuestion, value)
    }

    useEffect(
        () => {
            setEditingAnswer(true)
        }
        , []
    )


    

    const handleTypeAnswer = (type: string, isTrue?: boolean) => {
        switch (type) {
            case "Radio": return (
                <div className="form-check">
                    <input
                        defaultValue=""
                        className="form-check-input"
                        type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                    />
                </div>
            );
            case "Check": return (
                <div className="form-check">
                    <input
                        className="form-check-input"
                        defaultValue=""
                        type="checkbox"
                        id="flexCheckIndeterminate"
                    />
                </div>)
            default: return false;
        }
    }

    return (
        <div id="list-answer">
            {handleTypeAnswer(typeQuestions)}
            {//editingAnswes ||  typeQuestions === "Breve" || typeQuestions === "Longa" ?
                <input
                    autoFocus
                    className="answer-input"
                    type="text"
                    disabled={
                        typeQuestions === "Breve" || typeQuestions === "Longa"
                    }
                    placeholder={typeQuestions === "Breve" || typeQuestions === "Longa"?"":"Digite a Resposta"}
                    onChange={e => { handleChangeAnswer(idAnswer,idQuestion, e.target.value); }}
                    onBlur={e => done(e.target.value)}
                    value={typeQuestions === "Breve" ? "Resposta Curta ---" : typeQuestions === "Longa" ? "Resposta Longa ---------" : content}
                /> //:
                //<h5 onClick={edit}>{content ? content : "Digite a resposta"}</h5>
            }
            
            <div className="button" hidden={typeQuestions === "Breve" || typeQuestions === "Longa"}>
                <button onClick={() => { handleAddAnswer(idAnswer,idQuestion, content,typeQuestions)}} ><i className="fas fa-plus-circle " aria-hidden="true"></i></button>
                <button ><i className="far fa-images"></i></button>
                <button className="button" onClick={()=>handleDeleteAnswer(idAnswer)}><i className="far fa-times-circle"></i></button>
                
            </div>


        </div>

    )
}