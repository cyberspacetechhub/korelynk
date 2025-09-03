
import axios from "axios";
import baseURL from "../config/baseUrl";

export default axios.create({
    baseURL: baseURL,
    withCredentials: true // Ensure cookies are sent with requests
});

export const axiosPrivate = axios.create({
    baseURL:baseURL,
    headers:{'Content-Type':'application/json'},
    withCredentials:true
    
});