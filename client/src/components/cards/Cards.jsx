import { useState } from "react";
import Card from "../card/Card";
import Pag from "../pag/Pag";
import { useDispatch, useSelector } from "react-redux";
import { filterTeam } from "../../redux/actions"

function Cards ({driver}){

    const dispatch = useDispatch()
    const [cant, setCant] = useState(4)
    const [currentPage, setCurrentPage] = useState(1)
    
    const indexEnd = currentPage * cant;
    const indexIni = indexEnd - cant;
  
    
    const driverSlice = driver.slice(indexIni, indexEnd)
    const pages = Math.ceil(driver.length / cant)

    const handleFilter = event => {
        dispatch(filterTeam(event.target.value))
    }

    return <div>
            <select name="filter" onChange={handleFilter}>
                <option value = "all"> Todos los equipos </option>
                <option value = "Mercedes"> Mercedes </option>
                <option value = "Ferrari"> Ferrari </option>
                <option value = "McLaren"> McLaren </option>
                <option value = "Aston Martin"> Aston Martin </option>
                <option value = "Williams"> Williams</option>
                <option value = "Alpine"> Alpine </option>
                <option value = "Sauber"> Sauber </option>
                <option value = "Red Bull"> Red Bull </option>
                <option value = "Alfa Romeo"> Alfa Romeo </option>
                <option value = "Renault"> Renault </option>

            </select>
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