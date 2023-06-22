import {api_path} from "../Path";
import {decrypt} from "../../Encryption/Encryption";

export async function hasRated(id){
    const path = api_path+ 'user/rated/'+id
    const token = decrypt(sessionStorage.getItem('jwt'))


    return await fetch(path,{
        headers:{
            Authorization: 'Bearer '+token
        }
    })
}

export async function addRating(stars,id,description){
    const request = {
        film_id: id,
        rating: stars,
        description: description
    }

    const token = decrypt(sessionStorage.getItem('jwt'))

    const path = api_path+ 'ratings/add'

    return await fetch(path,{
        method: 'POST',
        headers:{
            Authorization: 'Bearer '+token,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(request)
    })
}