import { useState } from "react";
import styles from "./Searchbar.module.css"

function Searchbar(props) {

   const [ name, setName] = useState ("")
   
   const handleChange = event => {
      const {value} = event.target 
      setName(value)
   }
   
   const handleClick = event => {
      event.preventDefault()
      props.onSearch(name)
      setName("")
   }

 return (
      <div className={styles.body}>
         <input className={styles.bar}
            type='text'
            name= "search"
            id= "search"
            onChange = {handleChange}
            value={name} />
         <button className={styles.button} onClick={handleClick} >Buscar</button>
      </div>
   );
}
export default Searchbar