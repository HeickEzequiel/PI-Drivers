import { useState } from "react";
import Card from "../card/Card";
import Pag from "../pag/Pag";

function Cards ({driver}){

    const [cant, setCant] = useState(4)
    const [currentPage, setCurrentPage] = useState(1)
    
    const indexEnd = currentPage * cant;
    const indexIni = indexEnd - cant;
  
    
    const driverSlice = driver.slice(indexIni, indexEnd)
    const pages = Math.ceil(driver.length / cant)
//id, name, image, dob, nationality, teams, descriptio
    return <div>
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