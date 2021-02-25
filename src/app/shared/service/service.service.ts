import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { register } from '../model/register';
import { Login } from '../model/login';
import {newuser} from '../model/newuser'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  modals: any[] = [];
  registerURL: string = "http://localhost:8888/register";
  loginURL: string = "http://localhost:8888/login";
  userURL:string="http://localhost:8888/newuser";

  constructor(private _http: HttpClient) { }
  getRegisters() {
    return this._http.get<register[]>(this.registerURL);
  }

  postRegister(reg: register) {
    return this._http.post(this.registerURL, reg);
  }



  putRegister(reg: register,id:number) {
    console.log("reg ser",reg,"  id",id)
    const apiURL = `${this.registerURL}/${id}`;
    return this._http.put(apiURL, reg);
  }
  deleteRegister(reg: register) {
    const apiURL = `${this.registerURL}/${reg.id}`;
    return this._http.delete(apiURL);
  }

  //LOGIN 
  postLogin(log: Login) {
    console.log("log is ", log)
    const queryBody = {
      name: log['name'],
      username: log['user_n'],
      password: log['pass'],
      contact: log['phone'],
    }
    return this._http.post(this.userURL, queryBody);
  }

  postuser(log:Login){
    return this._http.post(this.loginURL, log);
  }
  
  getUserLogins() {
    return this._http.get<newuser[]>(this.userURL)
  }

  putUser1(user: newuser) {
    const apiURL = `${this.userURL}/${user.id}`;
    return this._http.put(apiURL, user);
  }

  //FOR MODEL
  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
}

remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x.id !== id);
}

open(id: string) {
    // open modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.open();
}

close(id: string) {
    // close modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.close();
}

logoutUser() {
  return sessionStorage.clear();
}
}
