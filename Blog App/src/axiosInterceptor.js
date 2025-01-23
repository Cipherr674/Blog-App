import axios from "axios";
const axiosInstance=axios.create({
    baseURL:'/api'
})


axiosInstance.interceptors.request.use((config)=>{
    const acessToken=sessionStorage.getItem('logintoken');
    if(acessToken){
        if(config){
            config.headers.token=acessToken;
        }
    }
    return config;
},(error)=>{
    return Promise.reject(error); // or console.log(error)
})

export default axiosInstance
