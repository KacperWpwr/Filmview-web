import {Outlet} from "react-router-dom";


export function NavBar({logged, setLogged}){

    console.log('User logged: '+logged)
    const log_out = ()=>{
        setLogged(false)
        sessionStorage.removeItem('jwt')
        window.location.pathname = '/'
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
                        <div className='usr-nav-navigation' onClick={()=>{window.location.pathname='/auth'}}>Log in/Register</div>}
                </div>
            </div>

            <Outlet />
        </>
    )
}