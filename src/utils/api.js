import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/"
const API_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers ={
    Authorization: "Bearer " + API_TOKEN,
};
// const params = "?api_key" + import.meta.env.API_KEY;


export const fetchDataFromApi = async(url, params)=>{
    try{
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data;
    }catch(err){
        console.log(err);
        return err;
    }
}
