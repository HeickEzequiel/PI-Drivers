const initialState = {
    drivers: [],
    allDrivers: []
}

function reducer(state = initialState,{ type, payload }){
    
    switch(type){

        case "GET_DRIVERS":
            return{ ...state, 
                    drivers: payload, 
                    allDrivers: payload 
                }

        case "FILTER_TEAM":{
            if(payload === 'All') 
                return{ ...state,
                        drivers: state.allDrivers}
            const filteredTeams = state.allDrivers.filter(
                driver => driver.team === payload)
            return {
                ...state,
                drivers: filteredTeams
            }
        }
        case "FILTER_ORIGIN":{
            if(payload === 'All') 
                return {...state, 
                        drivers: state.allDrivers}
            const filteredOrigin = state.drivers.filter(
                driver => driver.nationality === payload)
            return {
                ...state,
                drivers: filteredOrigin
            }
        }
        default: return {...state}
    }
}
export default reducer
