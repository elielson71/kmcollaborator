
export type typeQuestion= {
    id: number
    conteudo: string
    tipo_resposta: string
    info?: typeInfo
    answersQuestion?: typeAnswer
    hiddenInfo: boolean
}

export type typeAnswer = {
    idAnswer: number
    content: string
    id_question: number
    selectedType: string
    isTrue: boolean

}

export type typeInfo = {
    id_question: number
    nota: number,
    responsavel: number,
    senioridade: string,
    departamento: number,
    nivel: string,

}