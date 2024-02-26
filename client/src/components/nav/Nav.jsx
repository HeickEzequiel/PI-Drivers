import Searchbar from "../searchbar/Searchbar";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css"


 function Nav(props) {
    return (
       <div className={styles.body}>
         <Searchbar onSearch = {props.onSearch}/>
         <button className={styles.buttonhome}><Link to= '/home'>Home</Link> </button>
         <button className={styles.button}><Link to= '/newdriver'>Crear conductor</Link></button>
         <button className={styles.logout} onClick={props.logout} >Desconectarse ❌</button>
       
       </div>
    );
 }
 export default Nav