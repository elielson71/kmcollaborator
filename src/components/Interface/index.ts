
export type typeAnswer = {
    id_respostas: number
    descricao: string
    correta: string
    id_perguntas?: number
    status?: string
}

export type typeQuestions = {
    id_perguntas?: number
    conteudo: string
    tipo_resposta: string
    id_responsavel: number
    senioridade: string
    id_departamento: number
    nivel: string
    answers?: typeAnswer
    selecionado?:boolean
    nota_pergunta?:number

}
export type typeAvaliacao = {
    id_avaliacoes?: number
    titulo: string
    tempo: number
    id_usuario: number
    id_departamento?: number
    itens_avaliacao?: [{
        id_perguntas: number
        id_avaliacoes: number
        nota_pergunta: number 
        id_profissional?: number
        nota_profissional?: number
    }]
    questioes?:typeQuestions
}