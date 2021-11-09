import { useDepartamento } from "../Departamento/useDepartamento";
import { useState, useEffect, useMemo } from 'react';
import { typeProfissional } from '../../components/Interface';
import { useHistory } from 'react-router';
import { deleteProfissional, getOneProfissional, getProfissional, postProfissional, putProfissional } from "../../service/Profissional";
import { useUsuario } from "../Usuario/useUsuario";
import { validarCpf } from "../../functions/validarCpf";
export function useProfissional(id_profissional: string) {
    const { departamentos } = useDepartamento('')
    const { allUsuario } = useUsuario('')

    //listar
    const [allProfissionais, setAllProfissionais] = useState<typeProfissional[]>([{
        nome_completo: '', cpf: '', endereco: '', bairro: '',
        complementar: '', data_nascimento: '', telefone: '', celular: '',
        cargo: '', id_departamento: 0, nivel_senioridade: '', data_cadastro: '', id_usuario: 0
    }])
    const [profissional, setProfissional] = useState<typeProfissional>({
        nome_completo: '', cpf: '', endereco: '', bairro: '',
        complementar: '', data_nascimento: '', telefone: '', celular: '',
        cargo: '', id_departamento: 0, nivel_senioridade: '', data_cadastro: '', id_usuario: 0
    })
    const [busca, setBusca] = useState('')
    const filterBusca = useMemo(() => {
        const lowerBusca = busca.toLocaleLowerCase();
        return allProfissionais.filter(item =>
            item.nome_completo.toLocaleLowerCase().includes(lowerBusca)
        )
    }, [allProfissionais, busca])
    const history = useHistory()
    useEffect(() => {
        if (id_profissional !== 'new') {
            if (id_profissional === '') {
                recuperarTodosProfissionais()
            } else if (id_profissional !== '') {
                recuperarOneProfissional(parseInt(id_profissional))
            }
        }
    }, [id_profissional])

    async function deleteprofissional(id: number) {
        const resp = await deleteProfissional(id)
        if (resp.status === 204)
            window.location.reload()
    }
    async function recuperarOneProfissional(id: number) {

        const resp = await getOneProfissional(id)
        if (resp.data[0])
            resp.data[0].data_nascimento = (new Date(resp.data[0].data_nascimento).toLocaleString()).replaceAll('/', '-')
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
    async function recuperarProfissionalUsario(id_usuario: number) {
        const resp = await getProfissional()
        if (resp.status === 200) {
            const profissional = (resp.data.filter(item => item.id_usuario === id_usuario))
            setProfissional(profissional[0])
        }
    }
    async function handleSubmint() {
        const pro = profissional
        if (validarCpf(pro.cpf) === '')
            return
        pro.cpf = pro.cpf.replaceAll('.', '').replace('-', '')
        if (pro) {
            if (pro.nome_completo === '') {
                alert('Nome é um campo Obrigatório!')
                return
            }
            if (pro.id_usuario === undefined || pro.id_usuario === 0) {
                alert("Vincule um Usuário ao Profissional")
                return
            }
            let resp
            if (id_profissional === 'new') {
                resp = await postProfissional(profissional)
                console.log(resp)
            } else if (id_profissional !== 'new' && id_profissional !== '') {
                resp = await putProfissional(parseInt(id_profissional), profissional)
            } else {
                alert('Erro! Atualize a pagina e tente novamente')
                return
            }
            if (resp.status === 201 || resp.status === 204) {
                if (resp.status === 204) {
                    alert("Dados Atualizados com Sucesso!")
                }
                history.push('/profissionais')
                return

            } if (resp.data === 'ja existe profissional com esse usuario') {
                alert('Ja existe profissional com esse usuario')
                return
            } if (resp.data === 'Profissional já existe!') {
                alert('Já existe profissional com esse nome!')
                return
            } else {
                alert('Errro ao cadastrar Profissional!')
                return
            }
        }
    }

    return {
        departamentos, deleteprofissional, profissional, setProfissional,
        history, handleSubmint, allUsuario, allProfissionais,
        recuperarProfissionalUsario, setBusca, filterBusca
    }
}
