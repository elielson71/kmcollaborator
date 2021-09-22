
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
    descricao_depart?:string
    nivel: string
    answers?: typeAnswer
    situacao?: string
    nota_pergunta?: number

}
export type typeAvaliacao = {
    id_avaliacoes?: number
    titulo: string
    tempo: string
    id_usuario: number
    id_departamento?: number
    itensAvaliacao: typeQuestions[]
}

export type typeItensAvaliacao = {
    //id_perguntas: number
    //id_avaliacoes: number
    nota_pergunta: number
    id_profissional?: number
    nota_profissional?: number
    situacao: string
    questoes: typeQuestions
}
export type typeUsuario = {
    id_usuario: number
    login: string
    senha:string
    administrador: string
    data_cadastro: string
    nome_completo: string
    email: string
}

export type typeProfissional = {
    id_profissional?: number
    nome_completo: string
    cpf: string,
    endereco: string,
    bairro: string,
    complementar: string,
    data_nascimento: string,
    telefone: string,
    celular: string,
    cargo: string,
    id_departamento: number
    nivel_senioridade: string
    id_usuario: number
    data_cadastro:string

}
export type typeDepartamento ={
    id_departamento?:number
    nome:string
}