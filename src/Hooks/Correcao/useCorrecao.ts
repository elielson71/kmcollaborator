import { useHistory } from "react-router"
import { typeCorrecao } from "../../components/Interface"
import { useEffect, useState } from "react"
import { validarEmail } from "../../functions/validarEmail"
import { deleteUsuario, getOneUsuario, getUsuario, postUsuario, putUsuario } from "../../service/UsuarioService"
import { getCorrecao, getOneCorrecao, postCorrecao, putCorrecao } from "../../service/CorrecaoService"

export function useCorrecao(id_correcao:string){

    const [correcoes, setCorrecao] = useState<typeCorrecao[]>([])

    useEffect(() => {
      if (id_correcao === '') {
        recuperarTodosCorrecao()
      } else if (id_correcao !== '') {
        RecuperarOneCorrecao(parseInt(id_correcao))
      }
  
  
    }, [id_correcao])
  
    //Registrar
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [administrador, setAdministrador] = useState('N')
    const [email, setEmail] = useState('')
    async function handleSubmint(emailRef:any) {
      if (!validarEmail(email,emailRef))
        return
  

    const data = correcoes
      if (login !== '' && senha !== '' && nome !== '' && administrador !== '' && email !== '') {
        let resp
        if (id_correcao === 'new') {
          //data.id_correcao = ''
          resp = await postCorrecao(data)
        } else if (id_correcao !== 'new' && id_correcao !== '') {
  
          resp = await putCorrecao(parseInt(id_correcao), data)
        } else return
  
        if (resp.status === 201 || resp.status === 204) {
          if (resp.status === 204) {
            alert("Dados Atualizados com Sucesso!")
          }
          history.push('/correcao')
        } else if (resp.status === 404) {
          alert('Email ou Login já existe!')
        } else {
          alert('Errro ao cadastrar Correcao!')
        }
      } else {
        alert('Preencha todos os campos!')
      }
    }
  
  
    async function RecuperarOneCorrecao(id: number) {
      const resp = await getOneCorrecao(id)
      if (resp.status === 200) {

      }
    }
    const [allCorrecao, setAllCorrecao] = useState<typeCorrecao[]>([])
    async function recuperarTodosCorrecao() {
      const resp = await getCorrecao()
      if (resp.status === 200) {
        setCorrecao(resp.data)
        setAllCorrecao(resp.data)
      }
    }
  
    const history = useHistory()
    return{correcoes,history}
}