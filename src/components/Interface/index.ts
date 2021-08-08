
export type typeAnswer = {
    idAnswer: number
    content: string
    selectedType: string
    isTrue: boolean

}

export type typeQuestions = {
    conteudo: string
    tipo_resposta: string
    id_responsavel: number
    senioridade: string
    id_departamento: number
    nivel: string
    answers?:typeAnswer

}