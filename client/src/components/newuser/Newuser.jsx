import { useNavigate} from "react-router-dom"
import { useState } from "react"
import validation from "../../utils/validation"
import styles from "./Newuser.module.css"


function Newuser (props){
  
  const navigate = useNavigate()
  
  
  const [userData, setUserData] = useState ({
    name: "",
    lastName: "",
    email:"",
    password: ""
  })
        
  const [errors, setErrors] = useState({
    name: "Ingrese su nombre",
    lastName: "Ingrese su apellido",
    email: "Ingrese su email",
    password: "Ingrese su password"
  })
    
   
  const handleChange = (event) => {
    const {name, value} = event.target
    setUserData({...userData, [name]: value})
    setErrors(validation({...userData, [name]: value }))
  }
            
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/newuser/', {
        method: 'POST',headers: {
          'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert('Nuevo usuario creado con éxito');
        navigate("/")

      } else {
        alert('Error al guardar nuevo usuario:', response.statusText);
      }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
  };

  return(
    <div>
      <form onSubmit={handleSubmit} >
        <label style={{color: "white"}}>Nombre: </label>
          <input type='text'
               key="name"
               name= "name"
               value={userData.name}
               placeholder="Ingresar nombre"
               onChange={handleChange}
          />
      <p style={{color: "red"}}>{ errors.name ? errors.name : null }</p>
    <br />
        <label style={{color: "white"}}>Apellido: </label>
          <input type='text'
               key="lastName"
               name= "lastName"
               value={userData.lastName}
               placeholder="Ingresar apellido"
               onChange={handleChange}
          />
      <p style={{color: "red"}}>{ errors.lastName ? errors.lastName : null }</p>
    <br />
        <label style={{color: "white"}}>Email: </label>
          <input type='text'
               key="email"
               name= "email"
               value={userData.email}
               placeholder="Ingresar email"
               onChange={handleChange}
          />
      <p style={{color: "red"}}>{ errors.email ? errors.email : null }</p>
    <br />
        <label style={{color: "white"}}>Password: </label>
          <input type='password'
                key="password"
                name= "password"
                value={userData.password}
                placeholder="Ingresar password"
                onChange={handleChange}
          />
      <p style={{color: "red"}}>{ errors.password && errors.password }</p>
    <br />
      <button className={styles.button} type="submit" disabled={ errors.email || errors.password }>Crear usuario! </button>
        
      </form>
    </div>
  )
}
export default Newuser