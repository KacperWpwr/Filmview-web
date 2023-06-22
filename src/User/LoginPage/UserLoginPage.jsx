import {useEffect, useState} from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


export function UserLoginPage({setLogged}){


    const[is_login,setIsLogin] = useState(false)
    useEffect(()=>{
        document.title=is_login? "Log in":"Register"
    },[is_login])
    return(
        <div className="login-register-container">
            <div className="login-register-choice-container">
                <input id="register" type="radio" name="log-reg-input" className="sign-up" onClick={()=>setIsLogin(false)} defaultChecked/>
                <label htmlFor="register" className="log-reg-choice">Register</label>
                <input id="login" type="radio" name="log-reg-input" className="sign-in" onClick={()=>setIsLogin(true)}/>
                <label  htmlFor="login" className="log-reg-choice">Log in</label>
            </div>
            {is_login? <LoginForm setLogged={setLogged}/>: <RegisterForm setLogged={setLogged}/>}
        </div>
    )
}


