import { FILTERDB, FILTER_TEAM, LOAD_DRIVERS, ORDER } from "./action-types";

export function loadDrivers(drivers){
    for(let i=508; i<drivers.length; i++){
    
        drivers[i].teams=drivers[i].teams.toString()
        let teamsArray = drivers[i].teams.split(',').map(team => team.trim()).filter(team => team !== '');
        drivers[i].teams = teamsArray.join(', ');
        console.log(drivers[i].teams)}
    
    return{
        type: LOAD_DRIVERS,
        payload: drivers
    }
}
export function filterTeam(team){
   
    return{
        type: FILTER_TEAM,
        payload: team
    }
}
export function orderCards(order){
    return{
        type: ORDER,
        payload: order
    }
}
export function filterDB (originFilter){
    return {
      type: FILTERDB,
      payload: {
        originFilter,
      },
    };
  };