import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import './App.css';
import { CadAvaliacao } from './Pages/CadastroAvaliacao'
import { RegisterQuestion } from './Pages/RegisterQuestion';
import { ListaAvaliacoes } from './/Pages/ListaAvaliacoes'

function App() {
  return (
    
    <BrowserRouter>
      <Switch>
        <Route path="/avaliacao" exact component={ListaAvaliacoes} />
        <Route path="/avaliacao/new"  component={CadAvaliacao} />
        <Route path="/question/new"  component={RegisterQuestion} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
