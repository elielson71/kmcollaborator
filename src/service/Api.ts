import axios from 'axios'

export const api = axios.create({
    baseURL:`${process.env.REACT_APP_API_URL}/v1`,
    validateStatus:(status)=> {
        return status < 500;
    },
    
})