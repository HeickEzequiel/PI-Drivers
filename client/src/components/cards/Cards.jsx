import { useState } from "react";
import Card from "../card/Card";
import Pag from "../pag/Pag";
import { useDispatch, useSelector} from "react-redux";
import { filterTeam, orderCards, filterDB } from "../../redux/actions"
import styles from "./Cards.module.css"

function Cards ({teams, driver}){
    const drivers = useSelector(state => state.drivers)
    const dispatch = useDispatch()
    const [cant, setCant] = useState(9)
    const [currentPage, setCurrentPage] = useState(1)
    

    const indexEnd = currentPage * cant;
    const indexIni = indexEnd - cant;
  
    
    const driverSlice = drivers.slice(indexIni, indexEnd)
    const pages = Math.ceil(drivers.length / cant)

    const handleFilter = (event) => {
        dispatch(filterTeam(event.target.value));
      };
    const handleFilterDB = (event) => {
        dispatch(filterDB(event.target.value));
      };
    const handleOrder = event => {
        dispatch(orderCards(event.target.value));
        }

    return <div className={styles.container} >

        <div className={styles.filters}>
            <select name="filter" onChange={handleFilter}>
            <option value = "all"> Todos los equipos </option>       
            {teams.map((team, key) => (
            <option 
                key={key}
                value={team.name}>{team.name}
            </option>))}
            </select>

            <select name = "filterdb" onChange={handleFilterDB}>
                <option value="api"> Conductores api</option>
                <option value="database">Conductores Base de datos</option>
                <option value="all">Mostrar todos</option>

            </select>


            <select name="order" onChange={handleOrder}>
               <option value="A">Ascendente por orden alfabetico</option>
               <option value="D">Descendente por orden alfabetico</option>
               <option value="AE">Ascendente por fecha de nacimiento</option>
               <option value="DE">Descendente por fecha de nacimiento</option>
            </select>
        </div>


        {

            !driverSlice.length
            ? <h2>No existen conductores</h2>
            :driverSlice.map((driver, key) => (
                <Card
                    key={key}
                    id={driver.id}
                    name={driver.name.forename}
                    last_name={driver.name.surname}
                    image={driver.image.url}
                    dob={driver.dob}
                    nationality={driver.nationality}
                    teams={driver.teams}
                    description={driver.description}
                />
            ))
        }
    <Pag 
        setCurrentPage = {setCurrentPage}
        currentPage = {currentPage}
        pages = {pages} 
    />
    </div>

}
export default Cards