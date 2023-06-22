
import {useState} from "react";
import {Login} from "../../Requests/User/Authorization";
import {encrypt} from "../../Encryption/Encryption";


export default function LoginForm({setLogged}){
    const [login_correct,setLoginCorrect] = useState(true)
    const [login_error,setLoginError] = useState("")
    const [password_correct,setPasswordCorrect] = useState(true)
    const [password_error,setPasswordError]= useState("")


    const logging_props={
        setLoginCorrect:setLoginCorrect,
        setLoginError:setLoginError,
        setPasswordCorrect:setPasswordCorrect,
        setPasswordError:setPasswordError
    }
    return(
        <div className="log-inner-container">
            <div className="log-reg-text-container">
                <input id="login-login-input" type="text" className={getLoginClass(login_correct)} placeholder="Login"/>
                <div className="log-reg-error-feedback"> {login_error}</div>
            </div>
            <div className="log-reg-text-container">
                <input id="login-password-input" type="password" className={getPasswordClass(password_correct)} placeholder="Password"/>
                <div className="log-reg-error-feedback">{password_error}</div>
            </div>


            <button className="log-reg-button" onClick={()=>{loginFunction(setLogged,logging_props)}}>Log in</button>
        </div>
    )
}
function getLoginClass(login_correct){
    let className = "log-reg-text"
    if(!login_correct){
        className= className+" wrong"
    }
    return className
}
function getPasswordClass(password_correct){
    let className = "log-reg-text"
    if(!password_correct){
        className= className+" wrong"
    }
    return className
}


function loginFunction(setLogged,logging_props){
    const login = document.getElementById("login-login-input").value
    const password = document.getElementById("login-password-input").value
    logging_props.setLoginCorrect(true)
    logging_props.setLoginError("")
    logging_props.setPasswordCorrect(true)
    logging_props.setPasswordError("")
    const login_func= async ()=>{
        const response = await Login(login,password)
        const body = await response.json();
        if(response.ok){
            const date = new Date();
            date.setDate(new Date()+ 24*60*60*1000)

            sessionStorage.setItem("jwt",encrypt(body.token))
            setLogged(true)
            window.location.pathname="/"
        }else{
            switch (body.code){
                case 404:
                    logging_props.setLoginCorrect(false)
                    logging_props.setLoginError(body.detail)
                    break;
                case 403:
                    logging_props.setPasswordCorrect(false)
                    logging_props.setPasswordError(body.detail)
                    break;
            }
        }


    }
    login_func()

}