import {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {getFilms} from "../../Requests/Other/Film";
import {getFilmStars} from "../../Requests/Other/FilmStar";
import {api_path} from "../../Requests/Path";
import {AddImageToFilm, CreateNewFilm} from "../../Requests/Admin/Film";
import {AddFilmStarPicture, CreateNewFimStar, CreateNewFimStars} from "../../Requests/Admin/FilmStar";
import {CreateFilm} from "./CreateFilm";
import {CreateFilmStar} from "./CreateFilmStar";
import * as PropTypes from "prop-types";
import {BrowseFilms, BrowseFilmStars} from "./Browse";

export const options = {
    None: 1,
    BrowseFilms:2,
    EditFilm:3,
    CreateFilm:4,
    BrowseFilmStars:5,
    CreateFilmStar:6,
    EditFilmStar:7

}
export const option_reverse = {
    1: options.None,
    2: options.BrowseFilms,
    3: options.EditFilm,
    4: options.CreateFilm,
    5: options.BrowseFilmStars,
    6: options.CreateFilmStar,
    7: options.EditFilmStar
}

export function AdminMenu(){
    const [option, setOption] = useState(options.None)


    useEffect(()=>{
        if(!sessionStorage.getItem('admin_token')){
          alert('You are not logged!')
         window.location.pathname='/admin'
        }
    },[])

    return (
        <>
        <AdminNavbar setOption={setOption}/>
         {getDisplay(option,setOption)}
        </>
    )
}



function getDisplay(option,setOptions) {

    switch (option){
        case options.None:
            return <></>;
        case options.BrowseFilms:
            return <BrowseFilms setMode={setOptions}/>
        case options.CreateFilm:
            return <CreateFilm mode={option} setMode={setOptions}/>
        case options.BrowseFilmStars:
            return <BrowseFilmStars setMode={setOptions}/>
        case options.CreateFilmStar:
            return <CreateFilmStar mode={option} setMode={setOptions}/>
        case options.EditFilmStar:
            return <CreateFilmStar mode={option} setMode={setOptions}/>
        case options.EditFilm:
            return <CreateFilm mode={option} setMode={setOptions}/>
    }
}



function AdminNavbar({setOption}){
    const option_list = {
        2:'Browse films',
        4:  'Add new film',
        5: 'Browse film stars',
        6: 'Add film star'
    }

    

    return(
        <div className='admin-navbar-container'>
            {Object.keys(option_list).map(option =><
            div key={option} className='admin-navbar-choice' onClick={()=>{setOption(option_reverse[option])}}>
                {option_list[option]}
            </div>)}
        </div>
    )
}

