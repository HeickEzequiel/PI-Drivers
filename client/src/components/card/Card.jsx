import { Link } from "react-router-dom"

function Card(props){
    
    return(
        <div>
            <Link to={`/drivers/${props.id}`}>
                <img src = {props.image} alt={props.name}/>
            </Link>
            <h1>{props.name}</h1>
            <h1>{props.last_name}</h1> 
            <h1>{props.teams}</h1>
        </div>
    )
}
export default Card