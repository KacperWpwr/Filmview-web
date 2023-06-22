import {api_path} from "../Path";


export async function Register(login,password,match_password,email){
    const path = api_path + 'auth/user/register'

    const request = {
        login: login,
        email: email,
        password: password,
        password_repeat: match_password
    }

    return await fetch(path,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(request)
    })
}

export async function Login(login,password){
    const path = api_path + 'auth/user/login'

    const request = {
        login: login,
        password: password,

    }

    return await fetch(path,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(request)
    })
}