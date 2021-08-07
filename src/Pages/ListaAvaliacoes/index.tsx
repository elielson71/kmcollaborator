import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Avaliacao } from "../../components/Avaliacao/";
import { Button } from "../../components/Button";



import './styles.scss';;


type propsAssessments = {
    idAssessments: number
    departamento: string,
    nivel: string,
    title: string,
    responsavel: string,
    //avatar: Element,
}


export function ListaAvaliacoes() {
    const [assessments, setAssessments] = useState<propsAssessments[]>([])
    const history = useHistory();
    useEffect(() => {
        setAssessments([{
            idAssessments: 1,
            departamento: "suporte",
            nivel: "facil",
            title: "Avaliação para iniciante no suporte tecnico ",
            responsavel: "Elielson da Silva Santos",
            //avatar: <div><i className="fas fa-user-tie"></i></div>
        }, {
            idAssessments: 2,
            departamento: "suporte",
            nivel: "facil",
            title: "Avaliação para iniciante no suporte tecnico ",
            responsavel: "Elielson da Silva Santos",
            //avatar: <div><i className="fas fa-user-tie"></i></div>
        }])
    }

        , [])

    /*function handleCreatAssem(event:FormEvent){
        event.preventDefault();
        alert("ok")
        history.push('/avaliacao')
    }*/

        
    return (
        <div id="listaAvaliacao">
            <header>
                <Button onClick={()=>{history.push('/avaliacao/new')}}>CRIAR NOVA AVALIAÇÃO</Button>
                <h2>Lista de Avaliacoes</h2>
                <span>KMC</span>
            </header>

            {
                assessments.map((avaliacao) => (
                    <Avaliacao
                        key={avaliacao.idAssessments}
                        idAssessments={avaliacao.idAssessments}
                        departamento={avaliacao.departamento}
                        nivel={avaliacao.nivel}
                        titulo={avaliacao.title}
                        responsavel={avaliacao.responsavel}
                    //avatar={avaliacao.avatar}
                    />

                )


                )
            }

        </div >

    )
}