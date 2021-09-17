import axios from 'axios'
export const api = axios.create({
    baseURL:'http://localhost:3001',
    validateStatus:(status)=> {
        return status < 500;
    },
    
})