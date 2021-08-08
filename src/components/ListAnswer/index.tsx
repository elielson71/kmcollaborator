import './styles.scss'

type propsLista = {
    idAnswer:number,
    typeQuestions: string,
    isTrue:boolean,
    content:string,
    handleAddAnswer:any,
    handleDeleteAnswer: any;
    handleChangeAnswer: any;
    handleChangeTrueAnswer:any;
}
export function ListAnswer({ idAnswer, isTrue,typeQuestions,content, handleDeleteAnswer, handleChangeAnswer, handleAddAnswer,handleChangeTrueAnswer }: propsLista) {



    const done = (value: string) => {
        handleChangeAnswer(idAnswer, value)
    }


    

    const handleTypeAnswer = (type: string, isTrue: boolean) => {
        switch (type) {
            case "R": return (
                <div className="form-check">
                    <input
                        defaultValue=""
                        className="form-check-input"
                        type="radio" name={`flexRadioDefault`} id="flexRadioDefault1"
                        onChange={e=>handleChangeTrueAnswer(idAnswer,e.target.checked)}
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
                        onChange={e=>handleChangeTrueAnswer(idAnswer,e.target.checked)}
                        checked={isTrue}
                    />
                </div>)
            default: return false;
        }
    }

    return (
        <div id="list-answer">
            {handleTypeAnswer(typeQuestions,isTrue)}
            {
                <input
                    autoFocus
                    className="answer-input"
                    type="text"
                    disabled={
                        typeQuestions === "B" || typeQuestions === "L"
                    }
                    placeholder={typeQuestions === "B" || typeQuestions === "L"?"":"Digite a Resposta"}
                    onChange={e => { handleChangeAnswer(idAnswer, e.target.value); }}
                    onBlur={e => done(e.target.value)}
                    value={typeQuestions === "B" ? "Resposta Curta ---" : typeQuestions === "L" ? "Resposta Longa ---------" : content}
                /> 
                
            }
            
            <div className="button" hidden={typeQuestions === "B" || typeQuestions === "L"}>
                <button onClick={() => { handleAddAnswer(idAnswer, content,typeQuestions)}} ><i className="fas fa-plus-circle " aria-hidden="true"></i></button>
                <button ><i className="far fa-images"></i></button>
                <button className="button" onClick={()=>handleDeleteAnswer(idAnswer)}><i className="far fa-times-circle"></i></button>
                
            </div>


        </div>

    )
}