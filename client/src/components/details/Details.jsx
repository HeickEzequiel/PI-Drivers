import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./Details.module.css"

function Details(props){
    const {id} = useParams()
    const [driver, setDriver] = useState({})
    useEffect(() => {
        axios(`http://localhost:3001/drivers/${id}`).then(
            ({data}) => {
                if(data.id){
                    setDriver(data)
                    
                }else{
                    alert("No hay conductores con ese ID")
                }
            }
            );
            
        },[id]);

    return(
        <div className={styles.container} >
            <h1>{driver.forename} {driver.surname}</h1>
            <img  className={styles.container.img} src = {driver.image} alt = {driver.name}/>
            <h3>Fecha de nacimiento: {driver.dob}</h3>
            <h3>Nacionalidad: {driver.nationality}</h3>
            <h3>Escuderias: {driver.teams}</h3>
            <h3>Descripción: {driver.description}</h3>
        </div>
    )
}
export default Details