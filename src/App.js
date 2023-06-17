
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from "./Admin/LoginPage/LoginPage";
import {AdminMenu} from "./Admin/Menu/AdminMenu";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/'>
              <Route path='home'/>
              <Route path='film'/>
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
