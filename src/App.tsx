import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routers';
import { AuthProvider } from "./conext/authContext"
function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
