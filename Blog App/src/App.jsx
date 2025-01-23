
import './App.css'
import Home from './component/Home'
import Login from './component/Login'
import Signup from './component/Signup'
import AddBlogs from './component/AddBlogs'
import { Routes,Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import Main1 from './component/Main1'
import Privateroute from './component/Privateroute'




function App(){
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>

      <Route element={<Privateroute/>}>
      <Route path='/blogs'element={<Main1 child={<Home/>}/>}></Route>
      <Route path='/addblogs' element={<Main1 child={<AddBlogs/>}/>}></Route>
      </Route>
    </Routes>
    
    </>
  )
}

export default App
