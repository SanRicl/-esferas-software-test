
import Listar from './Pages/Index';
import EditarContato from './Pages/EditarContato/EditarContato';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import GlobalStyle from './styles/GlobalStyles'
import { ToastContainer } from 'react-toastify';
import history from './services/history';


function App() {
  return (
    <div className='container'>
     <BrowserRouter>
      <Routes history={history}>
        <Route exact path="/" element={<Listar />} />
        <Route path="/registrar" element={<EditarContato />}/>
        <Route path="/contato/:id/editar" element={<EditarContato/>}/>
      </Routes>
      <GlobalStyle/>
      <ToastContainer autoClose={3000}/>
    </BrowserRouter>
    </div>
  );
}

export default App;
