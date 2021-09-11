import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import './App.css';
import { CadAvaliacao } from './Pages/CadastroAvaliacao'
import { RegisterQuestion } from './Pages/RegisterQuestion';
import { ListaAvaliacoes } from './/Pages/ListaAvaliacoes'
import { RealizarAvaliacao } from './/Pages/RealizarAvaliacao'
import { Dashboard } from './Pages/Home';
import { RegistrarUsuario } from './Pages/RegistrarUsuario';
import { ListarUsuario } from './Pages/ListarUsuario';
import { EditarUsuario } from './Pages/EditarUsuario';
import { RegistrarProfissional } from './Pages/RegistrarProfissional';
import { ListarProfissionais } from './Pages/ListarProfissionais';

function App() {
  return (
    
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/usuario/new" exact component={RegistrarUsuario} />
        <Route path="/usuario" exact component={ListarUsuario} />
        <Route path="/usuario/:id" exact component={EditarUsuario} />
        <Route path="/avaliacao" exact component={ListaAvaliacoes} />
        <Route path="/realizaravaliacao" exact component={RealizarAvaliacao} />
        <Route path="/avaliacao/:id"  component={CadAvaliacao} />
        <Route path="/question/:id"  component={RegisterQuestion} />
        <Route path="/profissionais" exact  component={ListarProfissionais} />
        <Route path="/profissionais/:id" exact  component={RegistrarProfissional} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
