import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';

import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <CartProvider>
      <HashRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}

export default App;
