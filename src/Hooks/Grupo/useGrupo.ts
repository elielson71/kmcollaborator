import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { typeGrupo } from "../../components/Interface"
import { deleteGrupo, getOneGrupo, getGrupo, postGrupo, putGrupo } from "../../service/GrupoService"

export function useGrupo(id_grupo: string) {
  //Listar
  const [grupos, setGrupo] = useState<typeGrupo[]>([])
  const history = useHistory()
  useEffect(() => {
    if (id_grupo === '') {
      recuperarTodosGrupo()
    } else if (id_grupo !== '') {
      RecuperarOneGrupo(parseInt(id_grupo))
    }


  }, [id_grupo])

  async function excluirGrupo(id: number) {
    const resp = await deleteGrupo(id)
    if (resp.status === 204)
      window.location.reload()
    else if (resp.status >= 400) {
      alert(`Erro ao excluir!${resp.status}\n ${resp.data.message}`)
    }
    else {
    }
  }
  //Registrar
  const [nome, setNome] = useState('')

  async function handleSubmint() {


    const data = {
      id_grupo: id_grupo ? id_grupo : '',
      nome: nome
    }

    if (nome !== '') {
      let resp
      if (id_grupo === 'new') {
        data.id_grupo = ''
        resp = await postGrupo(data)
      } else if (id_grupo !== 'new' && id_grupo !== '') {

        resp = await putGrupo(parseInt(id_grupo), data)
      } else return

      if (resp.status === 201 || resp.status === 204) {
        if (resp.status === 204) {
          alert("Dados Atualizados com Sucesso!")
        }
        history.push('/grupo')
      } else {
        alert('Errro ao cadastrar Grupo!')
      }
    } else {
      alert('Preencha todos os campos!')
    }
  }


  async function RecuperarOneGrupo(id: number) {
    const resp = await getOneGrupo(id)
    if (resp.status === 200) {
      setNome(resp.data[0].nome)
    }
  }
  const [allGrupo, setAllGrupo] = useState<typeGrupo[]>([])
  async function recuperarTodosGrupo() {
    const resp = await getGrupo()
    if (resp.status === 200) {
      setGrupo(resp.data)
      setAllGrupo(resp.data)
    }
  }





  return {
    grupos, setGrupo, history, excluirGrupo,
     nome, setNome, handleSubmint, allGrupo
  }
}

