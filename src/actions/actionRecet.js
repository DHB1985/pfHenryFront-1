import axios from "axios";
import {api} from '../urlHostApi'
import { getItem } from "./actionAuth";
export const GET_RECIPES = "GET_RECIPES"

export function getRecetas(payload) {
    return async function (dispatch) {
      const token = getItem("userToken");
      try {
        const {data} = await axios.get(`${api}/recetas`, {
                headers:{
                    'x-access-token' : token
                }
        });
        console.log(data, "data recipes")
        if(data.success){
            return dispatch({type: GET_RECIPES, payload: data.message})
        } else {
            return {error: true}
        }
    } catch (error) {
      console.error(error) 
      return {error: error.message} 
    }
    };
}
