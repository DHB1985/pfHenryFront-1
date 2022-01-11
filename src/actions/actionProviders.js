import axios from "axios";
import {api} from '../urlHostApi'


export function getAllProviders() {
    return async function (dispatch) {
      var json = await axios.get(
        `${api}/profesionales`
      );
  
      return dispatch({
        type: "GET_ALL_PROVIDERS",
        payload: json.data.message,
      });
    };
}

export function getAllCities() {
    return async function (dispatch) {
      var json = await axios.get(
        `${api}/ciudades`
      );
  
      return dispatch({
        type: "GET_ALL_CITIES",
        payload: json.data.message,
      });
    };
    
}
export function getAllSpecialties() {
    return async function (dispatch) {
      var json = await axios.get(
        `${api}/especialidades`
      );
  
      return dispatch({
        type: "GET_ALL_SPECIALTIES",
        payload: json.data.message,
      });
    };
}