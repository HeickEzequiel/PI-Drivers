import { FILTERDB, FILTER_TEAM, LOAD_DRIVERS, ORDER } from "./action-types";

export function loadDrivers(drivers){
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