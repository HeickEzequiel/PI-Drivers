import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validation from "../../utils/validation.js"
import styles from "./Form.module.css"

function Form(props){

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email:"",
        password:""
    })
    
    const [errors, setErrors] = useState({
        email: "Ingrese su email",
        password: "Ingrese su password"
    })
    
    const handleChange = (event) => {
        const {name, value} = event.target
        setUserData({
            ...userData,
            [name]: value
        })
        setErrors(validation({
        ...userData,
        [name]: value}))
    }

    const handleSubmit = event => {
        event.preventDefault();
        props.login(userData);
    }

    const handleNewUser = () => {
        navigate("/newuser");
    };


return(
    <div>
        <div className={styles.welcome}> Bienvenido a la app de drivers, proyecto individual 
      de Henry creada por Ezequiel Heick.</div>
     <div className={styles.log}> por favor ingresa tu usuario y contraseña para acceder o crea
      un nuevo usuario</div>
    <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit} >
            <label >Email: </label>
                <input 
                    type='text'
                    key="email"
                    name= "email"
                    value={userData.email}
                    placeholder="Ingresar email"
                    onChange={handleChange}
                />
            <p >{ errors.email ? errors.email : null }</p>
        <br />
            <label >Password: </label>
                <input 
                    type='password'
                    key="password"
                    name= "password"
                    value={userData.password}
                    placeholder="Ingresar password"
                    onChange={handleChange}
                />
            <p>{ errors.password && errors.password }</p>
        <br />
            <button className={styles.button}
                type="submit"
                disabled={ errors.email || errors.password }
                >Ingresar</button>
            <button className={styles.button}     
                type="button"
                onClick={handleNewUser}>
                Crear nuevo usuario</button>
        </form>
    </div>
    </div>
    )
}

export default Form