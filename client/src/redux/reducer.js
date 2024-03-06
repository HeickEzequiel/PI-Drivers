import { FILTERDB, FILTER_TEAM, LOAD_DRIVERS } from "./action-types";

const initialState = {
  drivers: [],
  allDrivers: [],
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_DRIVERS:
      return {
        ...state,
        drivers: payload,
        allDrivers: payload,
      };

    case FILTER_TEAM:
      if (payload === 'all') {
        return {
          ...state,
          drivers: state.allDrivers,
        };
      }
      const filteredTeams = state.allDrivers.filter(
        (driver) => driver.teams && driver.teams.split(', ').includes(payload)
      );
      console.log(filteredTeams);
      return {
        ...state,
        drivers: [...filteredTeams],
      };

    case FILTERDB: {
      const { originFilter } = payload;

      if (originFilter === undefined || originFilter === 'all') {
        return {
          ...state,
          drivers: state.allDrivers,
        };
      }
      const filteredDrivers = state.allDrivers.filter((driver) => {
       
        if (originFilter === 'api') {
          return typeof driver.id === 'number';
        } else if (originFilter === 'database') {
          return typeof driver.id === 'string';
        }
        return false;
      });

      return {
        ...state,
        drivers: filteredDrivers,
      };
    }

    case 'ORDER':
      const orderCopy = [...state.drivers];
      if (payload === 'A')
        orderCopy.sort((a, b) => a.name.forename.localeCompare(b.name.forename));
      if (payload === 'D')
        orderCopy.sort((a, b) => b.name.forename.localeCompare(a.name.forename));
      if (payload === 'AE') orderCopy.sort((a, b) => a.dob.localeCompare(b.dob));
      if (payload === 'DE') orderCopy.sort((a, b) => b.dob.localeCompare(a.dob));

      return {
        ...state,
        drivers: orderCopy,
      };

    default:
      return state;
  }
}

export default reducer;