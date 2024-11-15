import axios from "axios";
import { LoginRequiredError, ServerHandlerError,authServerHandlerError } from "./ServerError";
import ConfigViewService from "../ViewService/ConfigViewService";

const {showLoading,hideLoading}=ConfigViewService();
const baseURL = "";

const mainServer=axios.create({
    baseURL:"https://localhost:7230/"
});
mainServer.defaults.headers.post={"Content-Type": "application/json"};
mainServer.defaults.headers.put={"Content-Type": "application/json"};

mainServer.defaults.headers.common={
    'Authorization':`Bearer ${localStorage.getItem('token')}`
}

mainServer.interceptors.request.use((cnf)=>{
    showLoading();
    return cnf;
});
mainServer.interceptors.response.use((cnf)=>{
    hideLoading();
    return cnf;
});

export const Get = async (action,data=null) => {
    checkAccessToken();
    let params="";
    if(data)
    {
        params="?";
        for(let key in data)
        {
            if(!!data[key])
            params+=key+"="+data[key]+"&";
        }
    }
   
    let response = await mainServer.get(baseURL + action.url+params).catch(err => {
       
        throw new ServerHandlerError(err);
    });
    
     if (response)
        return response.data

     return null;
}

export const Post = async (action, data) => {
    checkAccessToken();
    // let formData = new FormData();

    // for (let key in data) {
    //     formData.append(key, data[key]);
    // }


    let response = await mainServer.post(baseURL + action.url, data).catch(err => {
        throw new ServerHandlerError(err);
    });

    if (response)
        return response.data

    return null;
}

export const Put = async (action, data) => {
    checkAccessToken();
    // let formData = new FormData();

    // for (let key in data) {
    //     formData.append(key, data[key]);
    // }


    let response = await mainServer.put(baseURL + action.url, data).catch(err=>{
        throw new ServerHandlerError(err);
    });

    if (response)
        return response.data

    return null;
}

export const Remove = async (action, ids) => {
    checkAccessToken();
    return await mainServer.delete(baseURL + action.url + "/" + Object.values(ids).join("/")).catch(err=>{
        throw new ServerHandlerError(err);
    });
}

export const PostForm = async (action, data) => {
    checkAccessToken();
    let formData = new FormData();

    for (let key in data) {
        formData.append(key, data[key]);
    }


    let response = await mainServer.post(baseURL + action.url, formData,{
            headers: { "Content-Type": "multipart/form-data" }
        }
    ).catch(err => {
        throw new ServerHandlerError(err);
    });

    if (response)
        return response.data

    return null;
}


export const SignIn=async(data)=>{
    let response=await mainServer.post("api/connect/token",data).catch(err => {
        throw new authServerHandlerError(err);
    });

    if(response && response.data){
        let token=response.data;
        localStorage.setItem("token",token.access_token);
        return parseJWT(token.access_token);
    }
    return null;
}

export const SignOut=async()=>{
    let response=await mainServer.get("api/connect/endsession?id_token_hint="+localStorage.getItem("token")).catch(err => {
        throw new authServerHandlerError(err);
    });
    localStorage.removeItem("token");
    return response.data;
}

function checkAccessToken() {

    let token = localStorage.getItem("token");

    let isValid = false;
    if (token) {
        var currentTimestamp = new Date().getTime() / 1000;
        let user = parseJWT(token);
        if (user)
            isValid = user.exp > currentTimestamp;
        if (isValid)
            return true;
    }
    if (!isValid) {
        throw new LoginRequiredError();
    }
}

export function checkLogin() {
    
    let token = localStorage.getItem("token");
    let isValid = false;
    if (token) {
        var currentTimestamp = new Date().getTime() / 1000;
        let user = parseJWT(token);
        if (user)
            isValid = user.exp > currentTimestamp;
        if (isValid)
            return user;
    }

    return isValid;
}

function parseJWT (token) {
	let base64Url = token.split('.')[1];
	let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
	return JSON.parse(jsonPayload);
}
