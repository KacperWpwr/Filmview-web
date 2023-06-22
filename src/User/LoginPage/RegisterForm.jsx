
import {useState} from "react";
import {Register} from "../../Requests/User/Authorization";
import {encrypt} from "../../Encryption/Encryption";


export default function RegisterForm({setLogged}){
    const [login_correct,setLoginCorrect]= useState(true)
    const [login_error,setLoginError]= useState("")
    const [password_correct,setPasswordCorrect]= useState(true)
    const [password_error,setPasswordError]= useState("")
    const [email_correct,setEmailCorrect]= useState(true)
    const [email_error,setEmailError]= useState("")
    const [checkbox_correct,setCheckboxCorrect] = useState(true)
    const register_props={
        setLoginCorrect:setLoginCorrect,
        setLoginError:setLoginError,
        setPasswordCorrect:setPasswordCorrect,
        setPasswordError:setPasswordError,
        setEmailCorrect:setEmailCorrect,
        setEmailError:setEmailError,
        setCheckboxCorrect
    }
    return(
        <div className="reg-inner-container">
            <div className="log-reg-text-container">
                <input id="register-login-input" type="text" className={getClass(login_correct)} placeholder="Login"/>
                <div className="log-reg-error-feedback">{login_error}</div>
            </div>
            <div className="log-reg-text-container">
                <input id="register-password-input" type="password" className={getClass(password_correct)} placeholder="Password"/>
                <div className="log-reg-error-feedback">{password_error}</div>
            </div>
            <div className="log-reg-text-container">
                <input id="register-match-password-input" type="password" className={getClass(password_correct)} placeholder="Repeat Password"/>
                <div className="log-reg-error-feedback">{password_error}</div>
            </div>
            <div className="log-reg-text-container">
                <input id="register-email-input" type="text" className={getClass(email_correct)} placeholder="Email"/>
                <div className="log-reg-error-feedback">{email_error}</div>
            </div>




            <div id="checkbox-register">
                <input id="reg-check" type="checkbox" className={getCheckboxCorrect(checkbox_correct)}/>
                <label htmlFor="reg-check">I have read and accept user terms and terms of service.</label>
            </div>
            <button className="log-reg-button" onClick={()=>{registerFunction(setLogged,register_props)}}>Register</button>
        </div>
    )
}
function getClass(is_correct){
    let className = "log-reg-text"
    if(!is_correct){
        className= className+" wrong"
    }
    return className
}
function getCheckboxCorrect(checkbox_correct){
    if(checkbox_correct ){
        return ""
    }
    return "check-incorrect"
}
//

function registerFunction(setLogged,register_props){
    register_props.setLoginCorrect(true)
    register_props.setLoginError("")
    register_props.setPasswordCorrect(true)
    register_props.setPasswordError("")
    register_props.setEmailCorrect(true)
    register_props.setEmailError("")
    register_props.setCheckboxCorrect(true)

    const login = document.getElementById("register-login-input").value
    const password = document.getElementById("register-password-input").value
    const match_password = document.getElementById("register-match-password-input").value
    const email = document.getElementById("register-email-input").value
    const checkbox = document.getElementById("reg-check").checked
    let input_present= true
    if(login===""){
        register_props.setLoginCorrect(false)
        register_props.setLoginError("Field cannot be empty")
        input_present= false
    }
    if(/[#?%^|\\/\[\];]/.test(login)){
        register_props.setLoginCorrect(false)
        register_props.setLoginError("Login contains invalid characters")
        input_present= false
    }
    if(password===""||match_password===""){
        register_props.setPasswordCorrect(false)
        register_props.setPasswordError("Fields cannot be empty")
        input_present= false
    }

    if(email===""){
        register_props.setEmailCorrect(false)
        register_props.setEmailError("Field cannot be empty")
        input_present= false
    }

    if(!checkbox){
        register_props.setCheckboxCorrect(false)
        input_present=false
    }

    const register_func = async ()=>{
        const response = await Register(login,password,match_password,email,setLogged)
        const body = await response.json()
        if(response.ok){
            const date = new Date();
            date.setDate(new Date()+ 24*60*60*1000)
            sessionStorage.setItem("jwt",encrypt(body.token))
            setLogged(true)
            window.location.pathname="/"
        }else{
            switch (body.code){
                case 410:
                    register_props.setLoginCorrect(false)
                    register_props.setLoginError(body.detail)
                    break;
                case 409:
                    register_props.setPasswordCorrect(false)
                    register_props.setPasswordError(body.detail)
                    break ;
                case 411:
                    register_props.setEmailCorrect(false)
                    register_props.setEmailError(body.detail)
                    break;
            }
        }



    }
    if(input_present){
        register_func()
    }

}