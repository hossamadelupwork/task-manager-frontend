import { Injectable } from '@angular/core';
import * as store from 'store';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setToken(token:string){
    store.set('token', token);
  }

  getToken(){
    return store.get('token');
  }

  clearAllLocalStorage() {
    store.clearAll();
  }

  

}
