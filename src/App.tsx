import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import './App.css';
import { CadAvaliacao } from './Pages/CadastroAvaliacao'
import { RegisterQuestion } from './Pages/RegisterQuestion';
import { ListaAvaliacoes } from './/Pages/ListaAvaliacoes'
//import { RealizarAvaliacao } from './/Pages/RealizarAvaliacao'
import { Dashboard } from './Pages/Home';
import { RegistrarUsuario } from './Pages/RegistrarUsuario';
import { ListarUsuario } from './Pages/ListarUsuario';
import { RegistrarProfissional } from './Pages/RegistrarProfissional';
import { ListarProfissionais } from './Pages/ListarProfissionais';
import { ListarDepartamento } from './Pages/ListarDepartamento';
import { RegistrarDepartamento } from './Pages/RegistrarDepartamento';
import {Login} from './Pages/Login';
import  BaseConhecimento  from './Pages/BaseConhecimento/';
import PrivateRoute from './conext/authContext';
import { ListarGrupo } from './Pages/ListaGrupo';
import { RegistrarGrupo } from './Pages/RegistrarGrupo';


function App() {
  return (

    <BrowserRouter>
      <Switch>
        
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/home" exact component={Dashboard} />
        <PrivateRoute path="/usuario" exact component={ListarUsuario} />
        <PrivateRoute path="/usuario/:id" exact component={RegistrarUsuario} />
        <PrivateRoute path="/avaliacao" exact component={ListaAvaliacoes} />
        <PrivateRoute path="/avaliacao/:id" component={CadAvaliacao} />
        <PrivateRoute path="/question/:id" component={RegisterQuestion} />
        <PrivateRoute path="/profissionais" exact component={ListarProfissionais} />
        <PrivateRoute path="/profissionais/:id" exact component={RegistrarProfissional} />
        <PrivateRoute path="/departamento/:id" exact component={RegistrarDepartamento} />
        <PrivateRoute path="/departamento" exact component={ListarDepartamento} />
        <PrivateRoute path="/grupo" exact component={ListarGrupo} />
        <PrivateRoute path="/grupo/:id" exact component={RegistrarGrupo} />
        <PrivateRoute path="/base_conhecimento" exact component={BaseConhecimento} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
