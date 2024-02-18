import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Newdriver.module.css"
function Newdriver(props){
    
    const navigate = useNavigate()

    const [driver, setDriver] = useState({
        name:"",
        last_name:"",
        description:"",
        image:"",
        nationality:"",
        birthdate:"",
        teams:"",
    })
    
    const handleChange = (event) =>{
        const {name, value} = event.target
        setDriver({...driver, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            alert('Error al guardar nuevo conductor: ' + response.statusText);
            }
        }catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
    };

    return(
        <div>
          <form onSubmit={handleSubmit} >
            <label style={{color: "white"}}>Nombre: </label>
              <input 
                type='text'
                key="name"
                name= "name"
                value={driver.name}
                placeholder="Ingresar nombre"
                onChange={handleChange}
            />
            
            <br/>
            <label style={{color: "white"}}>Apellido: </label>
              <input 
                type='text'
                key="last_name"
                name= "last_name"
                value={driver.last_name}
                placeholder="Ingresar nombre"
                onChange={handleChange}
            />
            
            <br/>
            <label style={{color: "white"}}>Descripción: </label>
              <input
                type='text'
                key="description"
                name= "description"
                value={driver.description}
                placeholder="Ingresar descripción"
                onChange={handleChange}
            />
            <br/>
            
            <label style={{color: "white"}}>Imagen: </label>
              <input 
                type='url'
                key="image"
                name= "image"
                value={driver.image}
                placeholder="Ingresar link la imagen"
                onChange={handleChange}
            />
            <br/>
            
            <label style={{color: "white"}}>Nacionalidad: </label>
              <input 
                type='text'
                key="nationality"
                name= "nationality"
                value={driver.nationality}
                placeholder="Ingresar Nacionalidad"
                onChange={handleChange}
            />
            <br/>
            
            <label style={{color: "white"}}>Fecha de nacimiento: </label>
              <input
                type='date'
                key="birthdate"
                name= "birthdate"
                value={driver.birthdate}
                placeholder="Ingresar fecha de nacimineto"
                onChange={handleChange}
            />
            
            
            
            <br/>            
            
            <label style={{color: "white"}}>Escuderia: </label>
              <input 
                type='text'
                key="teams"
                name= "teams"
                value={driver.teams}
                placeholder="Ingresar escuderia"
                onChange={handleChange}
            />
            
            <br/>
            
            
            <button 
              className={styles.button}
              type="submit" > Guardar conductor! 
            </button>
        </form>
    </div>
    )
}
export default Newdriver

// //name: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// last_name: {
//   type: DataTypes.STRING,
//   allowNull: false
// },
// description:{
//   type: DataTypes.TEXT,
//   allowNull: false
// },
// image: {
//   type: DataTypes.STRING,
//   allowNull: false
// },
// nationality: {
//   type: DataTypes.STRING,
//   allowNull: false
// },
// birthdate: {
//   type: DataTypes.STRING,
//   allowNull: false