import { useEffect, useState } from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import './App.css'
import axios from "axios"
import Nav from './components/nav/Nav';
import Form from './components/form/Form';
import Newuser from './components/newUser/NewUser';
import Cards from './components/cards/Cards';
import Details from './components/details/Details';
import Search from './components/search/Search';
import Newdriver from './components/newdriver/Newdriver.jsx'



function App() {
  const initialState = []
  const navigate = useNavigate()
  const location = useLocation()

  //--LOGIN--//
  const [access, setAccess] = useState(false)
  async function login (userData) {
    try {
      const {email, password} = userData
      const URL = 'http://localhost:3001/'
      const {data} = await axios.post(URL, {email, password})
      if(data.access){
        setAccess(data.access)
        navigate('/home')
      }else{
        alert("Los datos son incorrectos!")
      }
    } catch (error) {
        alert(error.message)
    }
    
  }
  function logout(){
    setAccess(false)
  }
  useEffect(()=>{!access && navigate('/');},[access])

  //--LANDING PAGE--//
  const [driver, setDriver] = useState(initialState)
  async function drivers (){
    try {
      const {data} = await axios ('http://localhost:3001/home')
      const drv = data.map(({id, name, last_name, description, image, nationality, birthdate, teams}) =>
      ({id, name, last_name, description, image, nationality, birthdate, teams}))
      if(drv.length>0){
        setDriver([...driver, ...drv])
      }else{
        alert('No existen conductores')
      }
    } catch (error) {
        alert(error.message)
    }
  }
  useEffect(()=>{drivers()},[])

  //--SEARCH--//
  const [drvs, setDrvs] = useState(initialState)
  async function onSearch(name){
    try {
      const driverName = drvs.filter((driver)=> driver.name === name)
      if(driverName.length){
        return alert('El conductor ya existe')
      }
      const {data} = await axios(`http://localhost:3001/drivers?name=${name}`)
      const drvName = data.map(({id, name, last_name, description, image, nationality, birthdate, teams}) =>
      ({id, name, last_name, description, image, nationality, birthdate, teams}))
      if(drvName.length){
        setDrvs([...drvs, ...drvName])
        navigate("/search")
      }else{
        alert('No hay conductores con ese nombre!')
      }
    } catch (error) {
      alert(error.message)
    }
  }
  return(
    <div>
      {
        location.pathname !== "/" && location.pathname !== "/newuser" && location.pathname !== "/newdriver"
        ? <Nav onSearch = {onSearch} logout={logout}/>
        : null
      }
      <Routes>
        <Route
          path="/"
          element={<Form login = {login}/>}
          />
        <Route
          path="/newuser"
          element={<Newuser/>}
          />
        <Route
          path="/home"
          element={<Cards driver = {driver}/>}
          />
        <Route
          path="/drivers/:id"
          element= {<Details/>}
            />
        <Route
          path="/search"
          element={<Search drvs = {drvs} />}
            />
        <Route
          path="/newdriver"
          element={<Newdriver/>}
            />

      </Routes>
    </div>
  )
}

export default App
