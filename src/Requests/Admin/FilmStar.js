import {decrypt} from "../../Encryption/Encryption";
import {api_path} from "../Path";


export async function CreateNewFimStar(name, lastname){
    const token = decrypt(sessionStorage.getItem('admin_token'))

    const request = {
        name: name,
        lastname: lastname
    }

    const path = api_path+'filmstar/create'
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

export async function AddFilmStarPicture(id,image){
    const token = decrypt(sessionStorage.getItem('admin_token'))
    const path = api_path+'filmstar/'+id+'/add/picture'
    console.log(path)
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

export async function EditFilmStar(id,name,lastname){
    const token = decrypt(sessionStorage.getItem('admin_token'))

    const request = {
        id:id,
        name: name,
        lastname: lastname
    }

    const path = api_path+'filmstar/update'
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