import { useEffect, useState } from "react";
import { typeDepartamento } from "../../components/Interface";
import { getDepartamento, getOneDepartamento } from "../../service/DepartamentoService";
import { useHistory } from 'react-router-dom'
import { postDepartamento, putDepartamento } from '../../service/DepartamentoService';


export function useDepartamento(departamentoId: string) {

  const [departamentos, setDepartamentos] = useState<typeDepartamento[]>([])
  const [departamento, setDepartamento] = useState<typeDepartamento>({ nome: '' })



  useEffect(() => {
    async function RecuperarDepartamento() {
      if (departamentoId !== 'new' && departamentoId !== '') {
        const data = (await getOneDepartamento(parseInt(departamentoId))).data
        setDepartamento(data[0])

      }

    }
    RecuperarDepartamento()
    
    if (departamentoId === '')
      AllDepartamento()

  }, [departamentoId])

  async function AllDepartamento() {

    let data = [] as typeDepartamento[]
    if (data) {
      data = (await getDepartamento()).data
      setDepartamentos(data)
    }

  }

  const history = useHistory();
  async function handleSubmint() {

    if (departamentoId === 'new') {
      if (departamento.nome !== '') {
        const resp = await postDepartamento(departamento)
        if (resp.status === 201) {
          history.push('/departamento')
        } else if (resp.status === 404) {
          alert('Departamento já existe!')
        } else {
          alert('Error ao cadastrar Departamento!')
        }
      } else {
        alert('Preencha todos os campos!')
      }
    } else if (departamentoId !== '') {
      if (departamento.nome !== '') {
        const resp = await putDepartamento(parseInt(departamentoId), departamento)
        if (resp.status === 204) {
          history.push('/departamento')
        } else if (resp.status === 404) {
          alert('Departamento já existe!')
        } else {
          alert('Error ao cadastrar Departamento!')
        }
      } else {
        alert('Preencha todos os campos!')
      }
    }
  }

  function handleDepartamento(value: string) {
    setDepartamento({ ...departamento, nome: value })
  }
  return {
    departamento, handleSubmint, setDepartamento,
    handleDepartamento, history, departamentos
  }
}