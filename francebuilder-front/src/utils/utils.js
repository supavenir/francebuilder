import jwtDecode from 'jwt-decode';
import config from './config'

export function appName(){
  return config.appName
}

export function isEmpty(object){
  return Object.keys(object).length === 0
}

export function getFormValue(formData, fieldName){
  return formData.get(fieldName) != "" ? formData.get(fieldName) : null
}

export function redirectTo(url){
  if (typeof document !== 'undefined') {
    document.location.href = url
  }
}

export async function login(username, password){
  return customRequest("login", "POST", { username, password }).then(response => {
    saveJwtToken(response.token)
  });
}

export function removeJwtToken(){
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(config.localJwtKey)
  }
}

export function logout(){
  removeJwtToken()
  redirectTo("/security/login")
}

export function getAuthenticatedUser(){
  return request("security/me", "GET")
}

export function isJwtTokenExpired(){
  const expiredTime = jwtContent().exp * 1000;
  return Date.now() >= expiredTime;
}

export function jwtToken(){
  if (typeof window !== 'undefined') {
    return localStorage.getItem(config.localJwtKey)
  }
}

export function saveJwtToken(token){
  localStorage.setItem(config.localJwtKey, `Bearer ${token}`)
}

export function request(url, method, payload){
  if(jwtToken()){
    return customRequest(url, method, payload, {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': jwtToken()
    })
  }else{
    throw new Error("ANY_JWT_TOKEN")
  }
}

function jwtContent(){
  if (jwtToken()) {
    return jwtDecode(jwtToken())
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
    if (payload != null) httpConfig.body = JSON.stringify(payload);
  }

  return fetch(`${config.serverUrl}/${url}`, httpConfig)
    .then((response) => {
      const contentType = response.headers.get("content-type");
      return contentType && contentType.indexOf("application/json") !== -1 ? response.json() : response
    }).then((response) => {

      if(response.status == 403){
        customRequest("security/refresh-token", "GET").then(response => {
          saveJwtToken(response.token);
        }).then(() => {
          return customRequest(url, method, payload, _headers)
        })
      }else if(response.ok != undefined && response.ok == false){
        throw response
      }else{
        return response
      }
    })
    .catch(error => {
      throw error
    });
}