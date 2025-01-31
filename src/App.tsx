
import { Outlet } from 'react-router-dom'
import './App.css'
import { Navbar, Footer } from './components'


function App() {


  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
