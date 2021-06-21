import React from 'react';
import './styles.css'

const Questao = ({onSubmit,n_questao}) => (
            <div class="card shadow mb-6">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary" _msthash="1244724" _msttexthash="558675">Questão {n_questao}</h6>
                </div>
                <div>
                    <div class="card-body" _msthash="1039740" _msttexthash="30468386">

                        <label for="titulo_questao">Titulo da Questão</label>
                        <input type="text" class="form-control" id="floatingInput" placeholder="Titulo" />
                        <label for="corpo_questao">Corpo da Questão</label>
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Questão" id="floatingTextarea2" 
                            ></textarea>
                            <label for="floatingTextarea2"></label>
                        </div>
                    </div>
                </div>
                <button onClick={onSubmit}>Nova Pergunta</button>
            </div>
            
);

export default Questao;