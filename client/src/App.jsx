
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import Home from './pages/home'
import Cart from './pages/cart'
import Login from './pages/login'
import Register from './pages/register'


function App() {
 return (
  <div>
   
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
     
      <Route path="/register" element={<Register />} />
    </Routes>
  </div>
 )
}

export default App;

