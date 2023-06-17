import {useEffect, useState} from "react";
import {getFilms} from "../../Requests/Other/Film";
import {api_path} from "../../Requests/Path";
import {getFilmStars} from "../../Requests/Other/FilmStar";
import {options} from "./AdminMenu";

export function BrowseFilms({setMode}){
    const[films,setFilms] = useState([])
    const[display_films, setDisplayFilms ] = useState([])
    const [current_page_films, setCurrentPageFilms] = useState([])
    const [page_num, setPageNum] = useState(0)
    const [current_page, setCurrentPage] = useState(0)
    const per_page = 12



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

        setPageNum(Math.ceil(result.length/per_page))

        if( Math.ceil(result.length/per_page)>0){
            setCurrentPage(1)
        }
    }

    useEffect(()=>{
        const fetch_data = async ()=>{
            const result = await getFilms()
            if(result.ok){
                const body = await result.json()
                const films = body.films
                setFilms(films)
                setDisplayFilms(films)


                const num =  Math.ceil(films.length/per_page)

                setPageNum(num)
                if (num>0){
                    setCurrentPage(1)
                }

            }else{
                const body = await result.json()
                alert(body.message)
                window.location.pathname='/admin'
            }
        }

        fetch_data()
    },[])

    useEffect(()=>{

        const start = per_page*(current_page-1)
        let end =0

        if( start+per_page<display_films.length){
            end = start+per_page
        }else{
            end = display_films.length
        }

        if(current_page!=0){
            setCurrentPageFilms(display_films.slice(start,end))
        }
    },[current_page])



    return (
        <div className='admin-content-display'>
            <div className='admin-cd-search-bar-container'>
                <input type="text" className='admin-cd-search-bar' placeholder='Filter'
                       onChange={(event)=>{filter_films(event.target.value)}}/>
            </div>
            <div className='admin-cd-list'>
                {current_page_films.map(film =>{
                    return (
                        <div key={film.title} className='admin-cd-item-preview' onClick={
                            ()=>{
                                sessionStorage.setItem('admin-current-film',film.title)
                                setMode(options.EditFilm)
                            }
                        }>
                            <img className='admin-cd-item-preview-image' src={api_path+'film/'+film.title+'/picture'} alt=""/>
                            <div className='admin-cd-item-preview-name'>
                                {film.title}
                            </div>
                        </div>
                    )

                })}
                {current_page_films.length === 0 ? <div className='admin-cd-empty' >Nothing to display</div>: <></>}
            </div>
            <div className="admin-cd-list-footer">
                { page_num >0?getPageSelectionView(page_num,current_page,setCurrentPage):<></>}
            </div>
        </div>
    )
}

export function BrowseFilmStars( {setMode}){
    const[film_stars,setFilmStars] = useState([])
    const[display_film_stars, setDisplayFilmStars ] = useState([])
    const [current_page_stars, setCurrentPageStars] = useState([])
    const [page_num, setPageNum] = useState(0)
    const [current_page, setCurrentPage] = useState(0)
    const per_page = 12



    const filter_film_stars = (text) =>{
        const query = text.toLowerCase()

        const result = []

        film_stars.forEach(film_star =>{
            const name = (film_star.name +' '+ film_star.lastname).toLowerCase()
            if (name.includes(query)){
                result.push(film_star)
            }
        })

        setDisplayFilmStars(result)

        setPageNum(Math.ceil(result.length/per_page))

        if( Math.ceil(result.length/per_page)>0){
            setCurrentPage(1)
        }



    }

    useEffect(()=>{
        const fetch_data = async ()=>{
            const result = await getFilmStars()
            if(result.ok){
                const body = await result.json()
                const stars = body.stars
                setFilmStars(stars)
                setDisplayFilmStars(stars)

                const num =  Math.ceil(stars.length/per_page)
                setPageNum(num)
                if (num>0){
                    setCurrentPage(1)
                }
            }else{
                const body = await result.json()
                alert(body.message)
                window.location.pathname='/admin'
            }
        }

        fetch_data()
    },[])

    useEffect(()=>{

        const start = per_page*(current_page-1)
        let end =0


        if( start+per_page<display_film_stars.length){
            end = start+per_page
        }else{
            end = display_film_stars.length
        }



        if(current_page!==0){
            setCurrentPageStars(display_film_stars.slice(start,end))
        }
    },[current_page])

    return (
        <div className='admin-content-display'>
            <div className='admin-cd-search-bar-container'>
                <input type="text" className='admin-cd-search-bar' placeholder='Filter'
                       onChange={(event)=>{filter_film_stars(event.target.value)}}/>
            </div>
            <div className='admin-cd-list'>
                {current_page_stars.map(film_star =>{
                    console.log(api_path+'filmstar/'+film_star.id+'/picture')
                    return (
                        <div key={film_star.id} className='admin-cd-item-preview'
                             onClick={
                                 ()=>{
                                     sessionStorage.setItem('admin-current-fs',film_star.id)
                                     setMode(options.EditFilmStar)
                                 }
                             }>
                            <img className='admin-cd-item-preview-image' inputMode='url' src={api_path+'filmstar/'+film_star.id+'/picture'}  alt="" />
                            <div className='admin-cd-item-preview-name'>
                                {film_star.name+' '+film_star.lastname}
                            </div>
                        </div>
                    )

                })}
                {current_page_stars.length === 0 ? <div className='admin-cd-empty' >Nothing to display</div>: <></>}
            </div>
            <div className="admin-cd-list-footer">
                { page_num >0?getPageSelectionView(page_num,current_page,setCurrentPage):<></>}
            </div>
        </div>
    )
}





function getPageSelectionView(page_num,current_page,setCurrentPage){
    let key = 0

    let return_list =  []

    if(current_page>1) return_list.push(<div key={key} className="admin-cd-list-footer-button" onClick={()=>setCurrentPage(1)}> &lt;&lt; </div>)
    key++

    if(current_page>1) return_list.push(<div key={key}  className="admin-cd-list-footer-button" onClick={()=>setCurrentPage(current_page-1)}> &lt; </div>)
    key++

    if (current_page-1>1) return_list.push(<div key={key}  className="admin-cd-list-footer-button disabled"> ... </div>)
    key++

    if (current_page>1) return_list.push(<div key={key}  className="admin-cd-list-footer-button " onClick={()=>setCurrentPage(current_page-1)}> {current_page-1} </div>)
    key++

    if(current_page!==0) return_list.push(<div key={key}  disabled={true}  className="admin-cd-list-footer-button current"> {current_page} </div>)
    key++

    let max =current_page+3<page_num ? current_page+3:page_num
    for (let i = current_page+1; i <= max; i++) {
        return_list.push(<div key={key}  className="admin-cd-list-footer-button" onClick={()=>setCurrentPage(i)}> {i} </div>)
        key++

    }


    if (current_page+3<page_num) return_list.push(<div key={key}  className="admin-cd-list-footer-button disabled"> ... </div>)
    key++

    if(current_page<page_num) return_list.push(<div key={key}  className="admin-cd-list-footer-button" onClick={()=>setCurrentPage(current_page+1)}> &gt; </div>)
    key++

    if(current_page<page_num) return_list.push(<div key={key}  className="admin-cd-list-footer-button" onClick={()=>setCurrentPage(page_num)}> &gt;&gt; </div>)
    key++

    return return_list
}