import { useEffect, useMemo, useState } from "react"
import { useHistory } from "react-router-dom"
import { typeUsuario, typeUsuarioGrupo } from "../../components/Interface"
import { validarEmail } from "../../functions/validarEmail"
import { deleteUsuario, deleteUsuarioGrupo, getOneUsuario, getUsuario, getUsuarioGrupo, postUsuario, postUsuarioGrupo, putUsuario } from "../../service/UsuarioService"

export function useUsuario(id_usuario: string) {
  //Listar
  const [usuarios, setUsuario] = useState<typeUsuario[]>([])
  const history = useHistory()
  useEffect(() => {
    if (id_usuario === '') {
      recuperarTodosUsuario()
    } else if (id_usuario !== '') {
      RecuperarOneUsuario(parseInt(id_usuario))
      recuperarUsuarioGrupo(parseInt(id_usuario))
    }


  }, [id_usuario])

  async function excluirUsuario(id: number) {
    const resp = await deleteUsuario(id)
    if (resp.status === 204)
      window.location.reload()
    else if (resp.status >= 400) {
      alert(`Erro ao excluir!${resp.status}\n ${resp.data.message}`)
    }
    else {
    }
  }
  //Registrar
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')
  const [administrador, setAdministrador] = useState('N')
  const [email, setEmail] = useState('')
  async function handleSubmint(emailRef: any) {
    if (!validarEmail(email, emailRef))
      return

    const data = {
      id_usuario: id_usuario ? id_usuario : '',
      login: login,
      senha: senha,
      "nome_completo": nome,
      administrador: administrador,
      email: email,
    }

    if (login !== '' && senha !== '' && nome !== '' && administrador !== '' && email !== '') {
      let resp
      if (id_usuario === 'new') {
        data.id_usuario = ''
        resp = await postUsuario(data)
      } else if (id_usuario !== 'new' && id_usuario !== '') {

        resp = await putUsuario(parseInt(id_usuario), data)
      } else return

      if (resp.status === 201 || resp.status === 204) {
        if (resp.status === 204) {
          alert("Dados Atualizados com Sucesso!")
        }
        history.push('/usuario')
      } else if (resp.status === 404) {
        alert('Email ou Login já existe!')
      } else {
        alert('Errro ao cadastrar Usuario!')
      }
    } else {
      alert('Preencha todos os campos!')
    }
  }


  async function RecuperarOneUsuario(id: number) {
    const resp = await getOneUsuario(id)
    if (resp.status === 200) {
      setLogin(resp.data[0].login)
      setSenha(resp.data[0].senha)
      setNome(resp.data[0].nome_completo)
      setAdministrador(resp.data[0].administrador)
      setEmail(resp.data[0].email)
    }
  }
  const [allUsuario, setAllUsuario] = useState<typeUsuario[]>([])
  async function recuperarTodosUsuario() {
    const resp = await getUsuario()
    if (resp.status === 200) {
      setUsuario(resp.data)
      setAllUsuario(resp.data)
    }
  }
  const [id_grupo, setId_Grupo] = useState('')
  async function handleAddGrupo() {
    if (id_grupo === ''){
      alert('Selecione um Grupo para vincular!')
      return
    }
    if(id_usuario==='new'){
      return
    }

    const resp = await postUsuarioGrupo({ id_usuario, id_grupo })
    if (resp.status === 201) {
      alert("Grupo vinculado com sucesso")
      window.location.reload()
    } else if (resp.status === 404) {
      alert("Existe grupo vinculado ao usuarios")
    } else {
      alert("Erro não indentificado!")
    }
  }
  const [usuariogrupo, setUsuariogrupo] = useState<typeUsuarioGrupo[]>([])
  async function recuperarUsuarioGrupo(id_usuario: number) {
    if (id_usuario) {
      const resp = await getUsuarioGrupo(id_usuario)
      setUsuariogrupo(resp.data)
      
    }

  }
  async function excluirUsuarioGrupo(id_grupo: number) {
    const resp = await deleteUsuarioGrupo({ id_usuario, id_grupo })
    if (resp.status===204){
      window.location.reload()
    }else {
        alert('Error ao excluir')
    }
  }

  const [busca,setBusca]=useState('')
  const filterBusca = useMemo(()=>{
      const lowerBusca = busca.toLocaleLowerCase();
      return allUsuario.filter(item=>
          item.login.toLocaleLowerCase().includes(lowerBusca)
          )
  },[allUsuario,busca])
  return {
    usuarios, setUsuario, history, excluirUsuario,
    login, setLogin, senha, setSenha, nome, setNome,
    administrador, setAdministrador, email, setEmail,
    handleSubmint, allUsuario, handleAddGrupo, id_grupo,
    setId_Grupo, usuariogrupo, excluirUsuarioGrupo,
    setBusca,filterBusca
  }
}

