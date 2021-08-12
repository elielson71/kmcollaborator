
export type typeAnswer = {
    id_respostas: number
    descricao: string
    selectedType: string
    correta: boolean

}

export type typeQuestions = {
    id_perguntas?:number
    conteudo: string
    tipo_resposta: string
    id_responsavel: number
    senioridade: string
    id_departamento: number
    nivel: string
    answers?:typeAnswer

}