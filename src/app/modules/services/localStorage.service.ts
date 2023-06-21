import { Injectable } from '@angular/core';
import * as LZString from 'lz-string';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setDataLocalStorage(key:string, data:any){
    let compressedData = LZString.compressToUTF16(JSON.stringify(data));
    localStorage.setItem(key, compressedData)
 } 

 getDataLocalStorage(key:string){
  let compressedData=localStorage.getItem('reportCovid') || '{}'
  return  JSON.parse(LZString.decompressFromUTF16(compressedData));
 }


}
