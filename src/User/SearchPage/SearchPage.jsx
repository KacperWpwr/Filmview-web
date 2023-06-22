import {useEffect, useState} from "react";
import {getFilms} from "../../Requests/Other/Film";
import {options} from "../../Admin/Menu/AdminMenu";
import {api_path} from "../../Requests/Path";


export function SearchPage(){
    const[films,setFilms] = useState([])
    const[display_films, setDisplayFilms ] = useState([])
    const[query,setQuery] = useState('')

    const filter_films = (text) =>{
        const query = text.toLowerCase()

        const result = []

        films.forEach(film =>{
            const name = (film.title).toLowerCase()
            if (name.includes(query)){
                result.push(film)
            }
        })

        setDisplayFilms(result)

    }

    useEffect(()=>{
        const fetch_data = async ()=>{
            const result = await getFilms()
            if(result.ok){
                const body = await result.json()
                const films = body.films
                setFilms(films)
                setDisplayFilms(films)
            }else{
                const body = await result.json()
                alert(body.message)
                window.location.pathname='/'
            }
        }
        document.title = 'Search'
        fetch_data()
    },[])



    return(
        <div className='usr-search-container'>
            <div className='usr-search-input-container'>
                <input className='usr-search-input' type="text" placeholder='Search' onInput={(event)=>{filter_films(event.target.value)}}/>
            </div>
            <div className='usr-search-result'>
                {display_films.map(film=>{
                    return(
                        <div key={film.title} className='usr-search-item-preview' onClick={
                            ()=>{
                                sessionStorage.setItem('usr-current-film',film.title)
                                window.location.pathname= '/film'
                            }
                        }>
                            <img className='usr-search-preview-image' src={api_path+'film/'+film.title+'/picture'} alt=""/>
                            <div className='usr-search-preview-name'>
                                {film.title}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}