import axios from 'axios';
import { GET_ALL_DOGS, GET_BREED, GET_FILTER_TEMPERAMENT, GET_TEMPERAMENTS, ORDER_BY_NAME, ORDER_BY_WEIGHT, SHOW_DOG_DETAILS, FILTER_BY_DB } from '../types';
const myUrl = 'http://localhost:3001';


export function getAllDogs() {
    return async function (dispatch) {
        let info = await axios.get(`${myUrl}/dogs`);
        return dispatch({
            type: GET_ALL_DOGS,
            payload: info.data,
        });
    };
};

export function getTemperaments() {
    return async function (dispatch) {
        let info = await axios.get(`${myUrl}/temperament`);
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: info.data,
        });
    };
};

export function FilterByTemperament(payload) {
    return {
        type: GET_FILTER_TEMPERAMENT,
        payload
    };
};

export function getBreed(payload) {
    return async function (dispatch) {
        try {
            let info = await axios.get(`${myUrl}/dogs?name=${payload}`);
            return dispatch({
                type: GET_BREED,
                payload: info.data
            });
        } catch (error) {
            alert('dog not found')
        }
    };
};

export function OrderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    };
};

export function OrderByWeight(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    };
};

export function filterByDB(payload) {
    return {
        type: FILTER_BY_DB,
        payload
    };
};

export function showDogsDetails(id) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`${myUrl}/dogs/` + id);
            return dispatch({
                type: SHOW_DOG_DETAILS,
                payload: json.data
            });
        } catch (error) {
            alert({ error: error.message });
        };
    };
};

export function postDog(payload) {
    return async function() {
        const data = await axios.post(`${myUrl}/dog`, payload);
        return data;
    };
};
