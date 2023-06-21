import {Outlet} from "react-router-dom";


export function NavBar({logged, setLogged}){


    const log_out = ()=>{
        setLogged(false)
        sessionStorage.removeItem('usr-token')
    }
    return(
        <>
            <div className='usr-navbar'>
                <div className='usr-nav-title-part' onClick={()=>{window.location.pathname='/'}}> Filmview</div>
                <div className='usr-nav-search-bar-part'>
                    <div className='usr-nav-search-bar-container'>
                        <div className='usr-nav-search-bar' onClick={()=>{window.location.pathname='/search'}}>
                            Search
                        </div>
                        <div className='usr-nav-search-bar-icon'>
                            <i className='fa fa-search fa-2x'></i>
                        </div>
                    </div>
                </div>
                <div className='usr-nav-button-part'>
                    {logged ? <div className='usr-nav-navigation' onClick={log_out}>Logout</div>:
                        <div className='usr-nav-navigation'>Log in/Register</div>}
                </div>
            </div>

            <Outlet />
        </>
    )
}