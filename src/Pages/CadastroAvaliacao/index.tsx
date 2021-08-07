import { FormEvent, useEffect, useState } from 'react'

import './style.scss'
import { Button } from '../../components/Button';
import { CardQuestion } from '../../components/CardQuestion';
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios';

type Question = {
    id_perguntas: number,
    conteudo: string,
    id_departamento: string,
    nivel: string

}

export const CadAvaliacao = () => {
    const [Questions, setQuestion] = useState<Question[]>([]);
    const history = useHistory();

     async function QuestionsAPi(){
        const q = await axios.get<Question[]>('http://localhost:3001/questions')
            setQuestion(q.data)
    }
    
    /* id_perguntas: 296,
              conteudo: 'Qual é seu nome?',
              id_responsavel: 1,
              id_departamento: 1,
              nivel: 'F'*/
    useEffect(() => {
        QuestionsAPi()

    }
        , [])

    function handleCreateAssessments(event: FormEvent) {
        event.preventDefault();
        history.push('/')
    }
    return (
        <form onSubmit={handleCreateAssessments} id="cad-avaliacao">
            <header>
                <div className="Responsavel">
                    <label htmlFor="Responsavel">Responsável</label>
                    <select className="form-select" aria-label="Default select example" defaultValue="0">
                        <option value='0'>Selecione o Responsável</option>
                        <option value="1">Elielson da Silva Santos</option>
                        <option value="2">Junior</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input className="form-control" type="text" placeholder="Digite Titulo da Avaliação" />
                </div>
                <div>
                    <button type="submit" className="btn btn-success btn-lg btn-block" >Salvar Avaliacao</button>
                </div><div>
                    <Link to={'/question/new'}><Button>CRIAR NOVA QUESTÃO </Button></Link>
                </div>
            </header>
            <div className="listQuestion">
                {
                    Questions.map(question => (
                        <CardQuestion
                            key={question.id_perguntas}
                            title={question.conteudo}
                            nivel={question.nivel}
                            departamento={question.id_departamento}
                        />
                    ))
                }
            </div>
        </form>
    )
};




