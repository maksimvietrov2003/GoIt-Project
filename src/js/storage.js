import {STPRAGE_KEYS} from './constants.js'
export function getFromStorage (key){

 const data = localStorage.getItem(key)

 return data?JSON.parse(data):[];




}

export function saveToStorage(key,data){
 

 const array = getFromStorage(key)
 array.push(data)
 localStorage.setItem(key,JSON.stringify(array))


}
export function deleteItemFromStorage(key,data){
const array = getFromStorage(key)
 const filterArray = array.filter((id)=> id !== data)
localStorage.setItem(key, JSON.stringify(filterArray))

}
export function getFromStorageByID(key,data){

    const arrey = getFromStorage(key)

   return arrey.find((id) => id === data)
}