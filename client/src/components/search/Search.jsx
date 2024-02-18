import Card from "../card/Card";
import styles from "./Search.module.css"

function Search ({drvs}){

    return <div className={styles.container} >
      {
        !drvs.length ? <h2>No existen conductores</h2>
        :drvs.map((drv, key) => (
        <Card
          key={key}
          id={drv.id}
          name={drv.name}
          image={drv.image}
          dob={drv.dob}
          nationality={drv.nationality}
          teams={drv.teams}
          description={drv.description}
        />
        ))
      }
    </div>
  }
  export default Search