import { typeQuestions } from "../../components/Interface"

export const useValidarAvaliacao = (avaliacaoId:string,titulo:string,questionsSelecionadas: typeQuestions[]) => {

    if ( titulo === '') {
        alert('A Avaliação deve ter titutlo!')
        return
    } else if (questionsSelecionadas.length === 0) {
        alert('Selecione ao menos uma questão para salvar a Avaialção')
        return
    }
    else if (questionsSelecionadas.filter(value => value.nota_pergunta === 0 || value.nota_pergunta === undefined || value.nota_pergunta === null).length !== 0) {
        alert('As questões selecionadas devem ter uma nota acima de 0!')
        return
    }
    return true
}