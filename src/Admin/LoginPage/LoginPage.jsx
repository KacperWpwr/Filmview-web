import {useState} from "react";
import {AuthorizeAdmin} from "../../Requests/Admin/Authorization";
import {encrypt} from "../../Encryption/Encryption";


export default function LoginPage(){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')


    const submit_action = async ()=>{
        const response = await AuthorizeAdmin(login, password)

        if(response.ok){
            const body = await response.json()

            const token = body.token
            const encrypted_token = encrypt(token)

            sessionStorage.setItem('admin_token', encrypted_token)

            window.location.pathname = '/admin/home'
        }else{
            const body = await response.json()
            console.clear()
            alert(body.detail)
        }
    }

    return(
        <div className='admin-lp-container'>
            <div className='admin-lp-text'>
                Log in
            </div>
            <div className='admin-lp-input-container'>
                <div className='admin-lp-input'>
                    <input type="text" value={login} onChange={
                        (event)=>{setLogin(event.target.value)}
                    } className='admin-lp-input-field' placeholder='login'/>
                </div>

                <div className='admin-lp-input'>
                    <input type="password" value={password} onChange={
                        (event)=>{setPassword(event.target.value)
                    }} className='admin-lp-input-field' placeholder='password'/>
                </div>
            </div>
            <div className='admin-lp-button-container'>
                <div className='admin-lp-login-button' onClick={submit_action}>Login</div>
            </div>
        </div>
    )
}