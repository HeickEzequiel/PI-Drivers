import { Link } from "react-router-dom"
import styles from './Card.module.css'

function Card(props){
    
    return(
        <div className={styles.container} >
            <Link to={`/drivers/${props.id}`}>
                <img
                    className={styles.container.img} 
                    src = {props.image}/>
            </Link>
            <h1>{props.name}</h1>
            <h1>{props.last_name}</h1> 
            <h1>{props.teams}</h1>
        </div>
    )
}
export default Card