import {api_path} from "../Path";

export async function AuthorizeAdmin(login,password){
    const path = api_path+'auth/admin/login'

    const request = {
        login: login,
        password: password
    }
    const json = JSON.stringify(request)

    return await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: json
    })

}
