import {  Route, Switch } from 'react-router-dom';
import { CadAvaliacao } from '../Pages/CadastroAvaliacao'
import { RegisterQuestion } from '../Pages/RegisterQuestion';
import { ListaAvaliacoes } from '../Pages/ListaAvaliacoes'
import { Dashboard } from '../Pages/Home';
import { RegistrarUsuario } from '../Pages/RegistrarUsuario';
import { ListarUsuario } from '../Pages/ListarUsuario';
import { RegistrarProfissional } from '../Pages/RegistrarProfissional';
import { ListarProfissionais } from '../Pages/ListarProfissionais';
import { ListarDepartamento } from '../Pages/ListarDepartamento';
import { RegistrarDepartamento } from '../Pages/RegistrarDepartamento';
import {Login} from '../Pages/Login';
import  BaseConhecimento  from '../Pages/BaseConhecimento/';
import PrivateRoute from './PrivateRoutes';
import { ListarGrupo } from '../Pages/ListaGrupo';
import { RegistrarGrupo } from '../Pages/RegistrarGrupo';
import { ListarCorrecao } from '../Pages/ListarCorrecao';
import { CorrecaoAvaliacao } from '../Pages/CorrecaoAvaliacao';
import { RelatorioProfissional } from '../Pages/RelatorioPorProfissional';
import { RelatorioDepartamento } from '../Pages/RelatorioPorDepartamento';
export function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/home" exact component={Dashboard} />
            <PrivateRoute path="/usuario" exact component={ListarUsuario} role='ADM' />
            <PrivateRoute path="/usuario/:id" exact component={RegistrarUsuario} role='ADM' />
            <PrivateRoute path="/avaliacao" exact component={ListaAvaliacoes} />
            <PrivateRoute path="/correcao" exact component={ListarCorrecao} role='ADM' />
            <PrivateRoute path="/correcao/:id" exact component={CorrecaoAvaliacao} role='ADM' />
            <PrivateRoute path="/avaliacao/:id" component={CadAvaliacao} role='ADM' />
            <PrivateRoute path="/question/:id" component={RegisterQuestion} role='ADM' />
            <PrivateRoute path="/profissionais" exact component={ListarProfissionais} role='ADM' />
            <PrivateRoute path="/relatorioprofissionais" exact component={RelatorioProfissional} role='ADM' />
            <PrivateRoute path="/relatoriodepartamento" exact component={RelatorioDepartamento} role='ADM' />
            <PrivateRoute path="/profissionais/:id" exact component={RegistrarProfissional} role='ADM' />
            <PrivateRoute path="/departamento/:id" exact component={RegistrarDepartamento} role='ADM' />
            <PrivateRoute path="/departamento" exact component={ListarDepartamento} role='ADM' />
            <PrivateRoute path="/grupo" exact component={ListarGrupo} role='ADM' />
            <PrivateRoute path="/grupo/:id" exact component={RegistrarGrupo} role='ADM' />
            <PrivateRoute path="/base_conhecimento" exact component={BaseConhecimento} />
        </Switch>
    )
}