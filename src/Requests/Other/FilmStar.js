import {api_path} from "../Path";

export async function getFilmStars(){
    const path = api_path + 'filmstar/all'

    return await fetch(path)
}

export async function getFilmStar(id){
    const path = api_path+'filmstar/'+id+'/display'
    console.log(path)

    return await fetch(path)
}


