import axios from "axios"

export const getDrivers = () => {
    const endpoint = 'http://localhost:3001/home'
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)
            console.log(data)
            return dispatch({
                type: "GET_DRIVERS",
                payload: data
            })
        } catch (error) {
            alert(error.message)
        }
    }

}


export function filterTeam(teams){
    return{
        type: "FILTER_TEAM",
        payload: teams
    }
}

// export function filterOrigin(nationality){
//     return{
//         type: "FILTER_ORIGIN",
//         payload: nationality
//     }
// }