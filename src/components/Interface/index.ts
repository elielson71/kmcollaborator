
export type typeAnswer = {
    idAnswer: number
    descricao: string
    selectedType: string
    isTrue: boolean

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