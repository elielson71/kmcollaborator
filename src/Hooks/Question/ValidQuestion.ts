import { typeAnswer, typeQuestions } from "../../components/Interface"

export function ValidQuestion(Questions: typeQuestions, answers: typeAnswer[]) {
    //validar pergunta
    if (Questions.conteudo === "") {
        alert("Conteudo é campo Obrigatório!")
        return
    } else if (Questions.tipo_resposta === "") {
        alert("Não é possível salvar Questão sem um tipo de resposta! \nSelecione um tipo de resposta para Salvar!")
        return
    } else if (Questions.id_departamento === 0) {
        alert("Selecione o Departamento")
        return
    } else if (Questions.senioridade === '') {
        alert("O campo senioridade é Obrigatório")
        return
    } else if(Questions.tipo_resposta==='R' || Questions.tipo_resposta==='C'){
        let nullrespota = false
        let umverdadeiro = false

        answers.map(value => {
            nullrespota = value.descricao === ""
            if (!umverdadeiro)
                umverdadeiro = value.correta === 'S'
            return null
        })
        if (nullrespota) {
            alert("Não é possível salva com reposta em branco")
            return
        }

        if (!umverdadeiro) {
            alert("Marque a resposta verdadeira!")
            return
        }
    }

    return true
}
