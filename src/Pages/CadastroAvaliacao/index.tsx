import { FormEvent, useEffect, useState } from 'react'

import './style.scss'
import { Button } from '../../components/Button';
import { CardQuestion } from '../../components/CardQuestion';
import { useHistory } from 'react-router-dom';

type Question = {
    idQuestion: number,
    title: string,
    departamento: string,
    nivel: string

}

export const CadAvaliacao = () => {
    const [Questions, setQuestion] = useState<Question[]>([]);
    const history = useHistory();
    useEffect(() => {
        setQuestion([{
            idQuestion: 1,
            title: "A empresa que você está atendendo tem apenas um colaborador ",
            departamento: "suporte",
            nivel: "facil"
        }, {
            idQuestion: 2,
            title: "A",
            departamento: "suporte",
            nivel: "facil"
        }, {
            idQuestion: 3,
            title: "A empresa que você está atendendo tem apenas um colaborador ",
            departamento: "suporte",
            nivel: "facil"
        }, {
            idQuestion: 4,
            title: "A",
            departamento: "suporte",
            nivel: "facil"
        }, {
            idQuestion: 5,
            title: "A empresa que você está atendendo tem apenas um colaborador ",
            departamento: "suporte",
            nivel: "facil"
        }, {
            idQuestion: 6,
            title: "A",
            departamento: "suporte",
            nivel: "facil"
        }, {
            idQuestion: 7,
            title: "A empresa que você está atendendo tem apenas um colaborador ",
            departamento: "suporte",
            nivel: "facil"
        }, {
            idQuestion: 8,
            title: "A",
            departamento: "suporte",
            nivel: "facil"
        }, {
            idQuestion: 9,
            title: "A empresa que você está atendendo tem apenas um colaborador ",
            departamento: "suporte",
            nivel: "facil"
        }, {
            idQuestion: 10,
            title: "A",
            departamento: "suporte",
            nivel: "facil"
        }])
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
                    <select className="form-select" aria-label="Default select example" defaultValue="1">
                        <option selected>Selecione o Responsável</option>
                        <option value="1">Elielson da Silva Santos</option>
                        <option value="2">Junior</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input className="form-control" type="text" placeholder="Digite Titulo da Avaliação" />
                </div>
                <div>
                    <button type="submit"  className="btn btn-success btn-lg btn-block" >Salvar Avaliacao</button>
                </div><div>
                    <Button to='/question'>CRIAR NOVA QUESTÃO </Button>
                </div>
            </header>
            <div className="listQuestion">
                {
                    Questions.map(question => (
                        <CardQuestion
                            key={question.idQuestion}
                            title={question.title}
                            nivel={question.nivel}
                            departamento={question.departamento}
                        />
                    ))
                }
            </div>
        </form>
    )
};




