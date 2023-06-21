
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from "./Admin/LoginPage/LoginPage";
import {AdminMenu} from "./Admin/Menu/AdminMenu";
import {NavBar} from "./User/NavBar/Navbar";
import {useState} from "react";
import {MainPage} from "./User/MainPage/MainPage";
import {SearchPage} from "./User/SearchPage/SearchPage";
import {FilmPage} from "./User/FilmPage/FilmPage";

function App() {
    const [user_logged, setUserLogged] = useState(false)
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavBar logged={user_logged} setLogged={setUserLogged}/>}>
              <Route path='' index={true} element={<MainPage/>}/>
              <Route path='log'/>
              <Route path='search' element={<SearchPage/>}/>
              <Route path='film' element={<FilmPage logged={user_logged}/>}/>
          </Route>
          <Route path='/admin/'>
            <Route>
              <Route path='' index={true} element={<LoginPage/>}/>
              <Route path='home' element={<AdminMenu/>}/>
            </Route>
          </Route>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
