import { useEffect, useState } from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import './App.css'
import axios from "axios"
import Nav from './components/nav/Nav';
import Form from './components/form/Form';
import Newuser from './components/newuser/Newuser';
import Cards from './components/cards/Cards';
import Details from './components/details/Details';
import Search from './components/search/Search';
import Newdriver from './components/newdriver/Newdriver.jsx'
import { useDispatch } from 'react-redux';
import { loadDrivers } from './redux/actions.js';



function App() {
  
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

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
  useEffect(()=>{!access && navigate('/');},[access])  /// cambiar / a home para que saltear el login
  
  //--LANDING PAGE--//
  const [driver, setDriver] = useState([])
  async function drivers (){
    try {
      const {data} = await axios ('http://localhost:3001/home')
      const drv = data.map(({id, name, description, image, nationality, dob, teams}) =>
      ({id, name, description, image, nationality, dob, teams}))
      if(drv.length>0){
        setDriver(drv)
      }else{
        alert('No existen conductores')
      }
    } catch (error) {
      alert(error.message)
    }
  }
  
  
  
  //--SEARCH--//
  let [drvs, setDrvs] = useState([])
  async function onSearch(name){
    drvs = []
    try {

      const {data} = await axios(`http://localhost:3001/drivers?name=${name}`)
      const drvName = data.map(({id, name,  description, image, nationality, dob, teams}) =>
      ({id, name, description, image, nationality, dob, teams}))
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
  
  //--TEAMS--//
  const [teams, setTeams] = useState([])
  async function getTeams(){
    try {
      const {data} = await axios ('http://localhost:3001/teams')
      const tms = data.map(({id, name})=>({id, name}))
      if(tms.length>0){
        setTeams(tms)
      }else{
        alert('No existen equipos')
      }
    } catch (error) {
      
    }
  }
  
  ///////////////////////////////////////////////////////
  
  useEffect(() => {dispatch(loadDrivers(driver))});
  useEffect(() => {
    const fetchData = async () => {
      await drivers();
      await getTeams();
      
    };
    fetchData();
  }, []);
  
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
          element={<Cards teams ={teams} driver = {driver}/>}
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
