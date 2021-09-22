import { useDepartamento } from "../Departamento/useDepartamento";
import { useState, useEffect } from 'react';
import { typeProfissional } from '../../components/Interface';
import { api } from '../../service/Api';
import { useHistory } from 'react-router';
import { deleteProfissional, getOneProfissional, getProfissional, postProfissional, putProfissional } from "../../service/Profissional";
import { useUsuario } from "../Usuario/useUsuario";
export function useProfissional(id_profissional: string) {
    const { departamentos } = useDepartamento('')
    const { allUsuario } = useUsuario('')

    //listar
    const [allProfissionais, setAllProfissionais] = useState<typeProfissional[]>([])
    const [profissional, setProfissional] = useState<typeProfissional>({nome_completo:'', cpf:'', endereco:'', bairro:'',
    complementar:'', data_nascimento:'', telefone:'', celular:'',
    cargo:'', id_departamento:0, nivel_senioridade:'',data_cadastro:'', id_usuario:0})
    const history = useHistory()
    useEffect(() => {
        
        if (id_profissional === '') {
            recuperarTodosProfissionais()
        } else if (id_profissional !== '') {
            recuperarOneProfissional(parseInt(id_profissional))
        }

    }, [id_profissional])

    async function deleteprofissional(id: number) {
            const resp = await deleteProfissional(id)
            if (resp.status === 204)
                window.location.reload()
    }
    async function recuperarOneProfissional(id: number) {
        
        const resp = await getOneProfissional(id)
        resp.data[0].data_nascimento=(new Date(resp.data[0].data_nascimento).toLocaleString()).replaceAll('/','-')
        console.log(resp.data[0].data_nascimento)
        if (resp.status === 200) {
            setProfissional(resp.data[0])
        }
    }
    async function recuperarTodosProfissionais() {
        const resp = await getProfissional()
        if (resp.status === 200) {
            setAllProfissionais(resp.data)
        }
    }

    async function handleSubmint() {
        
        const pro = profissional
        if (pro)
            if (pro.nome_completo !== '') {
                let resp
                if (id_profissional === 'new') {
                    resp = await postProfissional(profissional)
                } else if (id_profissional !== 'new' && id_profissional !== '') {
                    resp = await putProfissional(parseInt(id_profissional), profissional)
                } else return

                if (resp.status === 201 || resp.status === 204) {
                    if (resp.status === 204) {
                        alert("Dados Atualizados com Sucesso!")
                    }
                    history.push('/profissionais')

                } else {
                    alert('Errro ao cadastrar Profissional!')
                }
            } else {
                alert('Preencha todos os campos Obrigatório!')
            }
        else
        alert('não salvou')
    }
    
    return {
        departamentos, deleteprofissional, profissional, setProfissional,
        history, handleSubmint, allUsuario,allProfissionais
    }
}
