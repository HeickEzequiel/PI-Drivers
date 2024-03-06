import axios from "axios"
import { useState } from "react"
import { useNavigate, Link} from "react-router-dom"
import styles from "./Newdriver.module.css"
import driverValidation from "../../utils/driverValidation"


function Newdriver(props){
    const {teams} = props
    const navigate = useNavigate()

    const [driver, setDriver] = useState({
      forename:"",
      surname:"",  
      url:"",
      dob:"",
      nationality:"",
      team1:"",
      team2:"",
      team3:"",
      description:"",
    })

          
    const [errors, setErrors] = useState({
      forename: "",
      surname: "",
      nationality: "",
      dob:""
      
    })


    const handleChange = (event) =>{

      const {name, value} = event.target
      console.log(name, value)
      setDriver({...driver, [name]:value})
      setErrors({ ...errors, [name]: driverValidation({ ...driver, [name]: value })[name] });
      
    }
    console.log(driver)
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!driver.forename || !driver.surname || !driver.dob || !driver.nationality || !driver.team1) {
        alert("Por favor completar todos los campos y seleccionar al menos la primer escuderia");
        return;
    }
      try {
        const response = await axios.post(
          'http://localhost:3001/newdriver', driver,{
            headers:{
              'Content-Type': 'application/json',
            },
          }
          );
          if (response.status === 200) {
            alert('Nuevo conductor creado con éxito');
          navigate("/home");
        } else {
          alert('Error al guardar nuevo conductor');
        }
        
      }catch (error) {
        console.error('Error al realizar la solicitud:', error);
        alert('Error al guardar nuevo conductor')
      }
      
    };
    
    
    const isButtonDisabled = () => {
      if(errors.forename === "No debe contener números ni caracteres especiales" || errors.surname ==="No debe contener números ni caracteres especiales"||errors.nationality ==="No debe contener números ni caracteres especiales"||errors.dob==="El conductor debe ser mayor de edad"){
        return true
      }else{
        return false
      }
    };
    console.log(isButtonDisabled())
    
    return(
      <div>
      <button className={styles.buttonhome}><Link to= '/home'>Home</Link> </button>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit} >
          <label style={{color: "white"}}>Nombre: </label>
            <input 
              type='text'
              key="forename"
              name= "forename"
              value={driver.forename}
              placeholder="Ingresar nombre"
              onChange={handleChange}/>
              <p style={{color: "red"}}>{ errors.forename ? errors.forename : null }</p>
        <br/>
          <label style={{color: "white"}}>Apellido: </label>
            <input 
              type='text'
              key="surname"
              name= "surname"
              value={driver.surname}
              placeholder="Ingresar apellido"
              onChange={handleChange}/>
              <p style={{color: "red"}}>{ errors.surname ? errors.surname : null }</p>
        <br/>
          <label style={{color: "white"}}>Imagen: </label>
            <input 
              type='url'
              key="url"
              name= "url"
              value={driver.url}
              placeholder="Ingresar link la imagen"
              onChange={handleChange}/>
        <br/>
          <label style={{color: "white"}}>Fecha de nacimiento: </label>
            <input
              type='date'
              key="dob"
              name= "dob"
              value={driver.dob}
              placeholder="Ingresar fecha de nacimineto"
              onChange={handleChange}/>
              <p style={{color: "white"}}>{ errors.dob ? errors.dob : null }</p>
        <br/>
          <label style={{color: "white"}}>Nacionalidad: </label>
            <input 
              type='text'
              key="nationality"
              name= "nationality"
              value={driver.nationality}
              placeholder="Ingresar Nacionalidad"
              onChange={handleChange}/>
        <br/>
        <p style={{color: "red"}}>{ errors.nationality ? errors.nationality : null }</p>
          <label style={{color: "white"}}>Descripción: </label>
            <input
              type='text'
              key="description"
              name= "description"
              value={driver.description}
              placeholder="Ingresar descripción"
              onChange={handleChange}/>
        <br/>
        
        <select name="team1" onChange={handleChange}>
            <option  value="">
              Seleccione una escudería
            </option>
            <option  value="">
              Ninguna
            </option>
            {teams.map((team, key) => (
            <option 
                key={key}
                value={team.name}>{team.name}
            </option>))}
        </select>

          <br />

        <select name="team2" onChange={handleChange}>
            <option  value="">
              Seleccione una escudería
            </option>
            <option  value="">
              Ninguna
            </option>
            {teams.map((team, key) => (
            <option 
                key={key}
                value={team.name}>{team.name}
            </option>))}
        </select>

          <br />

        <select name="team3" onChange={handleChange}>
            <option  value="">
              Seleccione una escudería
            </option>
            <option  value="">
              Ninguna
            </option>
            {teams.map((team, key) => (
            <option 
                key={key}
                value={team.name}>{team.name}
            </option>))}
        </select>
        
      
        <br/>

          <button 
            className={`${styles.button} ${isButtonDisabled() ? styles.disabledButton : ''}`}
            type="submit" 
            disabled={isButtonDisabled()}
          > 
            Guardar conductor! 
          </button>
        </form>
      </div>
    </div>
    )
  }
export default Newdriver