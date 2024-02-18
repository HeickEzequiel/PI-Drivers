import styles from "./Pag.module.css"
import React from "react";

const Pag = ({ pages, currentPage, setCurrentPage}) =>{
    
    const next = () => {
        if(currentPage !== pages)setCurrentPage(currentPage+1)
    }
    const prev = () => {
        if(currentPage !== 1)setCurrentPage(currentPage-1)
    }

    return(
        <div className={styles.container}>
            <button className={styles.button} onClick={prev}>Prev</button>
                <h3 className={styles.text}>
                    {currentPage} / {pages}
                </h3>
            <button className={styles.button} onClick={next}>Next</button>
        </div>
        )
}
export default Pag