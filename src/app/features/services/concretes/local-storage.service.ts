import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private tokenKey = 'token';
  private refreshTokenKey = 'refreshToken';

  set(key:string,data:any){
    localStorage.setItem(key,data);
  }

  remove(key:string){
    localStorage.removeItem(key);
  }

  get(key:string)
  {
   return localStorage.getItem(key);
  }


  setToken(token:string)  {
    localStorage.setItem("token",token);
  }

  removeToken(){
    localStorage.removeItem("token")
  }

  getToken(): string | null {
   return localStorage.getItem("token")
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  clearTokens() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

}