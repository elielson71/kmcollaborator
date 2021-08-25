import './style.scss'
import { Button } from '../../components/Button';
import { CardQuestion } from '../../components/CardQuestion';
import {  Link, useParams } from 'react-router-dom';
import { useAvaliacoes } from '../../Hooks/Avaliacao/useAvaliacoes';



export const CadAvaliacao = () => {
    const params = useParams<{ id: string }>()
    const avaliacaoId = params.id;
    const {avaliacao,setAvaliacao,enviarAvaliacao,Questions,setQuestion,deletarQuestao,} = useAvaliacoes(avaliacaoId)
    

    return (
        <div id="cad-avaliacao">
            <header className="row">
                <div className="col-3">
                    <label htmlFor="Responsavel">Responsável</label>
                    <select className="form-select"
                        name="Responsavel"
                        aria-label="Default select example"
                        value={avaliacao.id_usuario}
                        onChange={(e) => setAvaliacao({ ...avaliacao, id_usuario: parseInt(e.target.value) })}
                    >
                        <option value='0'>Selecione o Responsável</option>
                        <option value="1">Elielson da Silva Santos</option>
                        <option value="2">Junior</option>
                    </select>
                </div>
                <div className="col-5">
                    <div className="form-group">
                        <label htmlFor="titulo">Titulo</label>
                        <input name="titulo"
                            className="form-control"
                            type="text"
                            placeholder="Digite Titulo da Avaliação"
                            value={avaliacao.titulo}
                            onChange={(e) => setAvaliacao({ ...avaliacao, titulo: e.target.value })} />
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="tempo">Tempo de Execução</label>
                        <input name="tempo"
                            className="form-control tempo"
                            type="text"
                            placeholder="Tem Máximo Execução"
                            value={avaliacao.tempo}
                            onChange={(e) => setAvaliacao({ ...avaliacao, tempo: e.target.value ? e.target.value : '00:00:00' })} />
                    </div>
                </div>
                <div className="col-2">
                    <div className="row">
                        <button onClick={enviarAvaliacao} className="btn btn-success btn-lg btn-block col-6" >Salvar</button>
                        <Link to={'/avaliacao/'} className="btn btn-secondary col-6">Voltar</Link>
                        <Link to={'/question/new'}><Button>CRIAR NOVA QUESTÃO </Button></Link>
                    </div>
                </div>
            </header>
            <div className="listQuestion">
                {
                    Questions.map((question,key) => (
                        <CardQuestion
                            key={key}
                            id_perguntas={question.id_perguntas as number}
                            title={question.conteudo}
                            nivel={question.nivel}
                            id_departamento={question.id_departamento}
                            deletarQuestao={deletarQuestao}
                            nota_pergunta={question.nota_pergunta}
                            selecionado={question.selecionado}
                            setQuestions={setQuestion}
                        />
                    )).sort(() => 1)
                }
            </div>
        </div>
    )
};




