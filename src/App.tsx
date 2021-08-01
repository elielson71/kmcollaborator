import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import './App.css';
import { CadAvaliacao } from './Pages/CadastroAvaliacao'
import { RegisterQuestion } from './Pages/RegisterQuestion';
import { ListaAvaliacoes } from './/Pages/ListaAvaliacoes'

function App() {
  return (
    
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ListaAvaliacoes} />
        <Route path="/avaliacao"  component={CadAvaliacao} />
        <Route path="/question"  component={RegisterQuestion} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
