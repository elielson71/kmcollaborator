import React, { useState } from 'react';
import Questao from '../Questao/questao'
import Dados_avaliacao from '../Dados_avaliacao/dados_avaliacao'

import './style.css'
// import { Container } from './styles';

const Avaliacao = () => {
    const [perguntas, setperguntas] = useState([]);

    function addNovaPergunta(pergunta) {
        const itensCopy = Array.from(perguntas);
        itensCopy.push({ id: perguntas.length, value: pergunta });
        setperguntas(itensCopy);
    }



    return (

        <div className="container-fluid" id="avaliacao">
            <div class="col-3">
                <Dados_avaliacao />
            </div> 
            
            <div class="col-8">
            <Questao onSubmit={addNovaPergunta} n_questao="1"/>
                {perguntas.map(({ id, value }, index) => (
                    <Questao onSubmit={addNovaPergunta}
                    n_questao={index+2}
                    />
                ))}

            </div>
            <div>

            </div>
        </div >
    )
}

export default Avaliacao;