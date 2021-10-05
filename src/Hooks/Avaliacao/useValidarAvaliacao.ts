import { typeAvaliacao, typeQuestions } from "../../components/Interface"

export const useValidarAvaliacao = (avaliacaoId:string,avaliacao:typeAvaliacao, questionsSelecionadas: typeQuestions[]) => {
            
    if (avaliacaoId === '') {
        alert('Não foi possível atualizar!\n Atualize a pagina!')
        return
    }else if ( avaliacao.titulo === '') {
        alert('A Avaliação deve ter titutlo!')
        return
    }else if ( avaliacao.tempo === '00:00:00') {
        alert('A Avaliação deve tempo válido!')
        return
    }else if ( avaliacao.id_departamento === undefined) {
        alert('A Avaliação deve ter Departamento!')
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