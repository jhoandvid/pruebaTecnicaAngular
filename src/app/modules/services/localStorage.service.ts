import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setDataLocalStorage(key:string, data:any){

    localStorage.setItem(key, JSON.stringify(data))
 } 

 getDataLocalStorage(key:string){
  return  JSON.parse(localStorage.getItem(key) || '{}');
 }


}
