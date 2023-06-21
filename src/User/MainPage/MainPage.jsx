import {useEffect, useState} from "react";
import {getTopFilms} from "../../Requests/Other/Film";
import {api_path} from "../../Requests/Path";


export function MainPage(){
    const [top_films, setTopFilms] = useState([])

    useEffect(()=>{
        const fetch_data = async ()=>{
            const result = await getTopFilms(20)
            const body = await result.json()

            if(result.ok){
                setTopFilms(body.films)
                console.log(body.films)
            }else{
                alert(body.detail)
            }
        }

        fetch_data()
    },[])

    return (
        <div className='usr-mp-container'>
            <div className='usr-mp-content-separator'>
                <div className='usr-mp-content-separator-context'>
                    Top 20 films
                </div>
            </div>

            <ul className='usr-mp-content-display'>
                {top_films.map(film=>{
                    return(
                        <div className='usr-mp-film-display' onClick={()=>{
                            sessionStorage.setItem('usr-current-film',film.title)
                            window.location.pathname='/film'
                        }}>
                            <img className='usr-mp-film-display-picture' src={api_path+'film/'+film.title+'/picture'} alt=""/>
                            <div className='usr-mp-film-display-info'>
                                <div className='usr-mp-film-display-name'> {film.title}</div>
                                <div className='usr-mp-film-display-rating-container'>
                                    <i className='fa fa-star'></i>
                                    <div className='usr-mp-film-display-rating'>{film.rating}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}