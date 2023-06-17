import {api_path} from "../Path";
import {decrypt} from "../../Encryption/Encryption";


export async function CreateNewFilm(title,description,actor_list, director_list){
    const token = decrypt(sessionStorage.getItem('admin_token'))

    const request = {
        title:title,
        description: description,
        actors: actor_list,
        directors: director_list
    }

    const path = api_path+'film/create'
    const json = JSON.stringify(request)



    return await fetch(path,{
        method: 'POST',
        headers:{
            Authorization: 'Bearer '+token,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: json
    })
}


export async function AddImageToFilm(title, image){
    const token = decrypt(sessionStorage.getItem('admin_token'))
    const path = api_path+'film/'+title+'/add/picture'
    const formData = new FormData();
    formData.append("image", image, image.name);
    return await fetch(path,{
        method: 'POST',
        headers:{
            Authorization: 'Bearer '+token
        },
        body: formData

    })
}

export async function EditFilm(title, new_title, new_description, actor_list, director_list){
    console.log('Updating')
    const token = decrypt(sessionStorage.getItem('admin_token'))

    const request = {
        title:title,
        new_title: new_title,
        new_description: new_description,
        new_actors: actor_list,
        new_directors: director_list
    }

    const path = api_path+'film/update'
    const json = JSON.stringify(request)

    return await fetch(path,{
        method: 'PUT',
        headers:{
            Authorization: 'Bearer '+token,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: json
    })
}