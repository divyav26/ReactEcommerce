
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Success from './pages/Success'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Protected from './pages/Protected'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cart' element={<Protected Component={Cart} />} />
      <Route path='/success' element={<Protected Component={Success} />} />
      <Route path='/checkout' element={<Protected Component={Checkout} />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App



