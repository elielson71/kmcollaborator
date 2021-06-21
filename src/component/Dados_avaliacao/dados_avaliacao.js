import React from 'react';


// import { Container } from './styles';

const Dados_avaliacao = () => (
    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary" _msthash="1244893" _msttexthash="437151">Informações
            </h6>
            <div class="dropdown no-arrow" _msthidden="4">
                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink" _msthidden="4">
                    <div class="dropdown-header" _msthash="2081573" _msttexthash="267644" _msthidden="1">
                        Dropdown Header:</div>
                    <a class="dropdown-item" href="#" _msthash="1907997" _msttexthash="76466"
                        _msthidden="1">Action</a>
                    <a class="dropdown-item" href="#" _msthash="1908764" _msttexthash="232752"
                        _msthidden="1">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" _msthash="1910298" _msttexthash="349791"
                        _msthidden="1">Something else here</a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="dados_avalicao">
                <label for="status">Status</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected value="1">Aberto</option>
                    <option value="2">Concluída</option>
                    <option value="3">Cancelada</option>
                </select>

                <label for="responsavel">Responsável</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Selecione o Responsável</option>
                    <option value="1">Elielson da Silva Santos</option>
                    <option value="2">Junior</option>
                </select>
                <label for="status">Senioridade</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Selecione uma Senioridade</option>
                    <option value="J">Junior</option>
                    <option value="P">Pleno</option>
                    <option value="S">Senior</option>
                </select>

                <label for="responsavel">Departamento</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Selecione o Departamento</option>
                    <option value="1">Suporte</option>
                    <option value="2">Administrativo</option>
                </select>
                <label for="responsavel">Nível de Avaliação</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected value="F">Facil</option>
                    <option value="M">Médio</option>
                    <option value="D">Díficil</option>
                </select>
            </div>
        </div>
    </div>
);



export default Dados_avaliacao;