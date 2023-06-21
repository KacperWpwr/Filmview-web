import {api_path} from "../Path";
import {decrypt} from "../../Encryption/Encryption";

export async function hasRated(title){
    const path = api_path+ 'user/rated/'+title
    const token = decrypt(sessionStorage.getItem('jwt'))


    return await fetch(path,{

    })
}