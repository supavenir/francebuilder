import jwtDecode from 'jwt-decode';
import config from './config'

export async function login(username, password){
  customRequest("login", "POST", { username, password }).then(response => {
    saveJwtToken(response.token)
  });
}

export function isJwtTokenExpired(){
  const expiredTime = jwtContent().exp * 1000;
  return Date.now() >= expiredTime;
}

function saveJwtToken(token){
  localStorage.setItem(config.localJwtKey, `Bearer ${token}`)
}

export function request(url, method, payload){
  if(localStorage.getItem(config.localJwtKey)){
    return customRequest(url, method, payload, {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(config.localJwtKey)
    })
  }else{
    throw new Error("ANY_JWT_TOKEN")
  }
}

function jwtContent(){
  if (localStorage.getItem(config.localJwtKey)) {
    return jwtDecode(localStorage.getItem(config.localJwtKey))
  } else {
    throw new Error("ANY_JWT_TOKEN")
  }
}

export async function customRequest(url, method, payload, _headers){

  let httpConfig = {
    method,
    headers: _headers ? _headers : {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  }

  if(method !== 'GET'){
    httpConfig.body = payload != null ? JSON.stringify(payload) : ""
  }

  return fetch(`${config.serverUrl}/${url}`, httpConfig)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}