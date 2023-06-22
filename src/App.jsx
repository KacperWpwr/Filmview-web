
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./Admin/LoginPage/LoginPage";
import {AdminMenu} from "./Admin/Menu/AdminMenu";
import {NavBar} from "./User/NavBar/Navbar";
import React, {useEffect, useState} from "react";
import {MainPage} from "./User/MainPage/MainPage";
import {SearchPage} from "./User/SearchPage/SearchPage";
import {FilmPage} from "./User/FilmPage/FilmPage";
import {UserLoginPage} from "./User/LoginPage/UserLoginPage";


function App() {

  return (

        <BrowserRouter >
            <Routes >
                <Route path='/*' element={<Layout/>}/>


            </Routes>
        </BrowserRouter>

  );
}

function Layout(){
    const [user_logged, setUserLogged] = useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem('jwt')){
            setUserLogged(true)
        }
    },[])

    const setUsrLogged = (is_log)=>{
        const record = user_logged
        setUserLogged(is_log)
        if(record&&!is_log){
            if (window.location.pathname==='/'){
                window.location.reload()
            }
        }
    }

    return(
        <>
            <Routes>
                <Route path='/' element={<NavBar logged={user_logged} setLogged={setUsrLogged}/>}>
                    <Route path='' index={true} element={<MainPage/>}/>
                    <Route path='auth' element={<UserLoginPage setLogged={setUsrLogged}/>}/>
                    <Route path='search' element={<SearchPage/>}/>
                    <Route path='film' element={<FilmPage logged={user_logged}/>}/>
                </Route>


                <Route path='/admin' element={<LoginPage/>}/>
                <Route path='/admin_menu' element={<AdminMenu/>}/>
            </Routes>
        </>
    )
}

export default App;
