import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { typeUsuario } from "../../components/Interface"
import { deleteUsuario, getOneUsuario, getUsuario, postUsuario, putUsuario } from "../../service/UsuarioService"

export function useUsuario(id_usuario: string) {
  //Listar
  const [usuarios, setUsuario] = useState<typeUsuario[]>([])
  const history = useHistory()
  useEffect(() => {
    if (id_usuario === '') {
      recuperarTodosUsuario()
    } else if (id_usuario !== '') {
      RecuperarOneUsuario(parseInt(id_usuario))
    }


  }, [id_usuario])

  async function excluirUsuario(id: number) {
    alert(id)
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
  async function handleSubmint() {
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
  async function recuperarTodosUsuario() {
    const resp = await getUsuario()
    if (resp.status === 200) {
      setUsuario(resp.data)
    } else {
      alert('Error ao buscar Usuario Atualize a Pagina\n Se persistir entre em contato com desenvolvedor!')
    }
  }





  return {
    usuarios, setUsuario, history, excluirUsuario,
    login, setLogin, senha, setSenha, nome, setNome,
    administrador, setAdministrador, email, setEmail, handleSubmint,
  }
}