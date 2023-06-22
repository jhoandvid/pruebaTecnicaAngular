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

 clearDataLocalStorage(){

  //Obtener el usuario 
  
  //eliminar el usuario 
  window.localStorage.clear();

  //volver a almacenar el usuario en el localstorage

 }

 clearAllData(){
  window.localStorage.clear();
 }


}
