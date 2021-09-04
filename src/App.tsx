import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import './App.css';
import { CadAvaliacao } from './Pages/CadastroAvaliacao'
import { RegisterQuestion } from './Pages/RegisterQuestion';
import { ListaAvaliacoes } from './/Pages/ListaAvaliacoes'
import { Dashboard } from './Pages/Home';
import { RegistrarUsuario } from './Pages/RegistrarUsuario';
import { ListarUsuario } from './Pages/ListarUsuario';
import { EditarUsuario } from './Pages/EditarUsuario';

function App() {
  return (
    
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/usuario/new" exact component={RegistrarUsuario} />
        <Route path="/usuario" exact component={ListarUsuario} />
        <Route path="/usuario/:id" exact component={EditarUsuario} />
        <Route path="/avaliacao" exact component={ListaAvaliacoes} />
        <Route path="/avaliacao/:id"  component={CadAvaliacao} />
        <Route path="/question/:id"  component={RegisterQuestion} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
