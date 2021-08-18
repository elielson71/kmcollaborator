import { FormEvent, useEffect, useState } from 'react'

import './style.scss'
import { Button } from '../../components/Button';
import { CardQuestion } from '../../components/CardQuestion';
import { useHistory, Link, useParams } from 'react-router-dom';
import { typeAvaliacao, typeQuestions } from '../../components/Interface';
import { deleteQuestionsAnswer, getOneQuestions, getQuestions } from '../../service/QuestionsService';
import { getOneAvaliacoesQuestion, postAvaliacoes, putAvaliacoes } from '../../service/AvaliacoesService';
import { postItensAvaliacao } from '../../service/ItensAvaliacaoService';


export const CadAvaliacao = () => {
    const params = useParams<{ id: string }>()
    const avaliacaoId = params.id;
    const [avaliacao, setAvaliacao] = useState<typeAvaliacao>({ id_usuario: 1, tempo: 0, titulo: '' });
    const [Questions, setQuestion] = useState<typeQuestions[]>([]);

    async function dataQuestions(avaliacaoId: string) {
        if (avaliacaoId === 'new') {
            const data = (await getQuestions()).data
            setQuestion(data)
        } else if (avaliacaoId !== '') {
            const data = (await getOneAvaliacoesQuestion(parseInt(avaliacaoId))).data
            data['avaliacao'].map(v =>
                setAvaliacao(v)
            )
            console.log(data['questions'])
            setQuestion(data['questions'])
        }
    }

    useEffect(() => {
        dataQuestions(avaliacaoId)
    }, [avaliacaoId])

    const history = useHistory();

    const validarAvaliacao = () => {
        const questionsSelecionadas = Questions.filter(value => value.selecionado);
        if (avaliacao.titulo === '') {
            alert('A Avaliação deve ter titutlo!')
            return
        } else if (questionsSelecionadas.length === 0) {
            alert('Selecione ao menos uma questão para salvar a Avaialção')
            return
        }
        else if (questionsSelecionadas.filter(value => value.nota_pergunta === 0 || value.nota_pergunta === undefined).length !== 0) {
            alert('As questões selecionadas devem ter uma nota acima de 0!')
            return
        } else {
            const itens = questionsSelecionadas.map((item, key) => {
                let itens = {} as any
                itens = { nota_pergunta: item.nota_pergunta ? item.nota_pergunta : 0, id_perguntas: item.id_perguntas ? item.id_perguntas : 0 }
                return itens
            }) as typeAvaliacao['itens_avaliacao']

            setAvaliacao({ ...avaliacao, itens_avaliacao: itens })
            return true
        }
    }
    async function salvarAvaliacoes(Questions: typeQuestions[]) {
        if (validarAvaliacao()) {
            if (await postAvaliacoes(avaliacao)) {
                alert('Avaliação Registrada com Sucesso!')
                history.push('/avaliacao')
            }
            else {
                alert('Erro ao Registrar Avaliação!')
            }
        }
    }
    async function updateAvaliacoes() {

        if (avaliacaoId === '' || (avaliacaoId === 'new')) {
            alert('não foi possível atualizar!\n Atualize a pagina!')
            return
        }
       /* if (avaliacao.itens_avaliacao){
            const itensAvaliacao = avaliacao.itens_avaliacao.filter(itens => )
            if (itensAvaliacao.length !== 0)
            postItensAvaliacao(itensAvaliacao)
        }*/

        if (validarAvaliacao()) {
            if (await putAvaliacoes(parseInt(avaliacaoId), avaliacao)) {
                alert('Avaliação Atualizada com Sucesso!')
                history.push('/avaliacao')
            }
            else {
                alert('Erro ao Registrar Avaliação!')
            }
        }
    }
    const deletarQuestao = async (e: FormEvent, id_perguntas: number) => {
        e.preventDefault();
        if (await deleteQuestionsAnswer(id_perguntas))
            setQuestion(Questions.filter(item => item.id_perguntas !== id_perguntas))
    }

    const enviarAvaliacao = async (e: FormEvent) => {
        if (avaliacaoId === 'new')
            salvarAvaliacoes(Questions)
        else if (avaliacaoId !== '')
            updateAvaliacoes()
    }

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
                            type="number"
                            placeholder="Tem Máximo Execução"
                            value={avaliacao.tempo}
                            onChange={(e) => setAvaliacao({ ...avaliacao, tempo: e.target.value ? parseInt(e.target.value) : 0 })} />
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
                    Questions.map(question => (
                        <CardQuestion
                            key={question.id_perguntas}
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




