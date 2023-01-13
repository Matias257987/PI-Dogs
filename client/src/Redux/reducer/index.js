import { FILTER_BY_DB, GET_ALL_DOGS, GET_BREED, GET_FILTER_TEMPERAMENT, GET_TEMPERAMENTS, ORDER_BY_NAME, ORDER_BY_WEIGHT, SHOW_DOG_DETAILS } from '../types';

const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    details: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_ALL_DOGS:
            action.payload.forEach((e) => {
                if (!e.temperaments[0]) e.temperaments[0] = "No-Temperaments";
            });
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            };

        case GET_TEMPERAMENTS:
            const filterTemperament = action.payload.filter((e) => e.name !== "");
            return {
                ...state,
                temperaments: filterTemperament,
            };

        case GET_FILTER_TEMPERAMENT:
            const allDogs = state.allDogs;
            let filterDogs = [];
            if (action.payload === "All") {
                filterDogs = allDogs;
            } else {
                for (let i = 0; i < allDogs.length; i++) {
                    let found = allDogs[i].temperaments.find((e) => e === action.payload);
                    if (found) {
                        filterDogs.push(allDogs[i]);
                    };
                };
            };
            return {
                ...state,
                dogs: filterDogs,
            };

        case GET_BREED:
            return {
                ...state,
                dogs: action.payload,
            };

        case ORDER_BY_NAME:
            const sortedName = action.payload === "A-Z" ? state.allDogs.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
            }) : state.allDogs.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
            });
            return {
                ...state,
                dogs: sortedName,
            };

        case FILTER_BY_DB:
            const createdFilter = action.payload === 'DB' ?
                state.allDogs.filter(el => el.createdInDB === true) :
                state.allDogs.filter(el => !el.createdInDB);
            return {
                ...state,
                dogs: createdFilter,
            }

        case ORDER_BY_WEIGHT:
            const sortedWeight = action.payload === "min_weight" ? state.allDogs.sort((a, b) => {
                if (parseInt(a.weight[1]) > parseInt(b.weight[1])) return 1;
                if (parseInt(b.weight[1]) > parseInt(a.weight[1])) return -1;
                return 0;
            }) : state.allDogs.sort((a, b) => {
                if (parseInt(a.weight[1]) > parseInt(b.weight[1])) return -1;
                if (parseInt(b.weight[1]) > parseInt(a.weight[1])) return 1;
                return 0;
            });
            return {
                ...state,
                dogs: sortedWeight,
            };

        case SHOW_DOG_DETAILS:
            let dDetails = action.payload;
            if (!dDetails[0].temperaments[0]) {
                dDetails[0].temperaments[0] = 'No-Temperaments';
            };
            return {
                ...state,
                details: dDetails,
            };

        default:
            return state;
    };
};

export default rootReducer;
