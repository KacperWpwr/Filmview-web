import {api_path} from "../Path";

export async function getFilms(){
    const path = api_path + 'film/all'

    return await fetch(path)
}

export async function getFilmDisplay(film_title){
    const path = api_path + 'film/'+film_title+'/display'

    return await fetch(path,{
        method: 'GET'
    })
}