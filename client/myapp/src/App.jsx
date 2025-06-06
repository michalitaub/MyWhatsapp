import { Routes, Route } from 'react-router-dom'
import Login from './Components/Reggister/Login'
import HomePage from './Components/HomePage/HomePage'
import Logout from './Components/Reggister/Logout'

function App() {
 
  return (
    <div className="App">
   <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/homePage' element={<HomePage />} >
          
          

        </Route>
      </Routes>
    </div>
  )
}

export default App
