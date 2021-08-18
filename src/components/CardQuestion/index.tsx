import { Link } from 'react-router-dom'
import { ButtonIcon, TitleCadQuestion } from '../componetsStypes'
import { typeQuestions } from '../Interface'
import './styles.scss'
type propsQuestion = {
    title: string,
    id_departamento: number,
    nivel: string
    id_perguntas: number
    deletarQuestao: any
    selecionado?:boolean
    nota_pergunta?:number
    setQuestions:React.Dispatch<React.SetStateAction<typeQuestions[]>>
    

}
const item = {} as any
export function CardQuestion({ title, id_departamento, id_perguntas, nivel, deletarQuestao,selecionado,nota_pergunta,setQuestions }: propsQuestion) {

    return (
        <div id="card-questao">
            <div className="card ">
                <div className="card-title">
                    <TitleCadQuestion>
                        <ButtonIcon>
                            <button onClick={(e) => deletarQuestao(e, id_perguntas)}><i className="far fa-times-circle"></i></button>
                        </ButtonIcon>
                        <div>
                            <label htmlFor="">Nota</label>
                            <input type="text"
                                name="Nota"
                                value={nota_pergunta}
                                onChange={e=>setQuestions(prev=>prev.map(item=>item.id_perguntas===id_perguntas?{...item,nota_pergunta:e.target.value?parseFloat(e.target.value):0}:item))}
                            />
                        </div>
                        <input type="checkbox"
                            className="form-check-input"
                            checked={selecionado}
                            onChange={e=>setQuestions(prev=>prev.map(item=>item.id_perguntas===id_perguntas?{...item,selecionado:e.target.checked}:item))}
                        />
                    </TitleCadQuestion>

                </div>
                <div className="card-bory">

                    <div className="titulo-pergunta">
                        <h5>{title} </h5>
                    </div>
                    <div className="info-pergunta">
                        <span>Departamento: {id_departamento}</span>
                        <span>nivel: {nivel}</span>
                    </div>
                    <div >
                        <Link to={`/question/${id_perguntas}`}><button className="btn btn-secondary">Visualizar Pergunta</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}