import {useEffect, useState} from "react";
import {AddImageToFilm, CreateNewFilm, EditFilm} from "../../Requests/Admin/Film";
import {getFilmStar, getFilmStars} from "../../Requests/Other/FilmStar";
import {api_path} from "../../Requests/Path";
import {options} from "./AdminMenu";
import {getFilmDisplay} from "../../Requests/Other/Film";

export function CreateFilm({mode,setMode}){
    const [film_title, setFilmTitle] = useState('')
    const [film_description, setFilmDescription] = useState('')
    const [actor_list, setActorList] = useState([])
    const [director_list, setDirectorList] = useState([])
    const[film_star_list, setFilmStarList] = useState([])
    const[actor_choice_list, setActorChoiceList] = useState([])
    const[director_choice_list, setDirectorChoiceList] = useState([])
    const[filtered_director_choice_list, setFilteredDirectorChoiceList] = useState([])
    const[filtered_actor_choice_list, setFilteredActorChoiceList] = useState([])
    const [director_choice_open, setDirectorChoiceOpen] = useState(false)
    const [actor_choice_open, setActorChoiceOpen] = useState(false)




    const submit = async (is_edit)=>{
        if(film_title === ''){
            alert('Film title cannot be empty')
            return
        }

        if(film_description === ''){
            alert('Film description cannot be empty')
            return
        }

        if(actor_list.length === 0){
            alert('Film has to have al least one actor')
            return
        }

        if(director_list.length === 0){
            alert('Film has to have at least one director')
            return
        }

        const actor_request_list = []
        const director_request_list = []

        actor_list.forEach(actor=>{
            actor_request_list.push(actor.id)
        })

        director_list.forEach(director=>{
            director_request_list.push(director.id)
        })
        const elem = document.getElementById('admin-cd-film-image')
        //console.log(elem)



        const result = is_edit ? await EditFilm(sessionStorage.getItem('admin-current-film'),film_title, film_description,actor_request_list, director_request_list): await CreateNewFilm(film_title, film_description,actor_request_list, director_request_list)
        const body = await result.json()
        if(result.ok){

            if(is_edit){
                alert('Film edited successfully')
            }else{
                alert('Film added successfully')
            }
            if(elem.files.length  > 0){
                const file = elem.files[0]
                const img_result = await AddImageToFilm(film_title,file)
                const img_body = await img_result.json()

                if(img_result.ok){
                    if(is_edit){
                        alert('Film image changed successfully')
                    }else{
                        alert('Film image added successfully')
                    }
                }else{

                    alert(img_body.detail)
                }

            }

        }else{
            console.log(body)
            alert(body.detail)
        }
    }

    const clear = () =>{
        setFilmTitle('')
        setFilmDescription('')
        setActorList([])
        setDirectorList([])
        document.getElementById('admin-cd-film-image').value = ''
    }

    const cancel = ()=>{
        setMode(options.None)
    }

    const filter_actors = (text) =>{
        const query = text.toLowerCase()

        const result = []

        actor_choice_list.forEach(actor=>{
            const param = (actor.name + ' '+ actor.lastname).toLowerCase()

            if(param.includes(query)){
                result.push(actor)
            }

        })

        setFilteredActorChoiceList(result)
    }

    const filter_directors = (text) =>{
        const query = text.toLowerCase()

        const result = []
        director_choice_list.forEach(director=>{
            const param = (director.name + ' '+ director.lastname).toLowerCase()

            if(param.includes(query)){
                result.push(director)
            }

        })

        setFilteredDirectorChoiceList(result)
    }





    const add_actor = (in_actor) =>{
        const result = []
        actor_list.forEach(actor=>{
            result.push(actor)
        })

        result.push(in_actor)

        setActorChoiceOpen(false)

        setActorList(result)

    }

    const add_director = (in_director) =>{
        const result = []
        director_list.forEach(director=>{
            result.push(director)
        })
        result.push(in_director)

        setDirectorChoiceOpen(false)
        setDirectorList(result)
    }

    const delete_actor =(in_actor)=>{
        const result = []

        actor_list.forEach(actor =>{
            if (actor.id !== in_actor.id){
                result.push(actor)
            }

        })

        setActorList(result)
    }

    const delete_director =(in_director)=>{
        const result = []


        director_list.forEach(director =>{
            if (director.id !== in_director.id){
                result.push(director)
            }

        })

        setDirectorList(result)
    }


    useEffect(()=>{

    },[])


    useEffect(()=>{
        const fetch_data = async ()=>{
            const result = await getFilmStars()
            const body = await result.json()
            if(result.ok){
                const stars = body.stars
                setActorChoiceList(stars)
                setDirectorChoiceList(stars)
                setFilmStarList(stars)
                setFilteredActorChoiceList(stars)
                setFilteredDirectorChoiceList(stars)

                if(mode === options.EditFilm){
                    await fetch_film_data()
                }
            }else{
                alert(body.detail)
                window.location.pathname = '/admin'
            }
        }
        
        const fetch_film_data = async ()=>{

            if(!sessionStorage.getItem('admin-current-film')){
                alert('Something went wrong!')
                sessionStorage.clear()
                window.location.pathname = '/admin'
            }

            const result = await getFilmDisplay(sessionStorage.getItem('admin-current-film'))
            const body = await result.json()
            if(result.ok){
                setFilmTitle(body.title)
                setFilmDescription(body.description)
                const actors = body.actors
                const directors = body.directors


                setActorList(actors)

                setDirectorList(directors)
            }else{
                alert(body.detail)
            }


        }


        fetch_data()


    },[])

    useEffect(()=>{

        const result = []



        film_star_list.forEach(star =>{
            if (!director_list.includes(star)){

                result.push(star)
            }
        })


        setDirectorChoiceList(result)
        setFilteredDirectorChoiceList(result)
    },[director_list])

    useEffect(()=>{
        const result = []

        film_star_list.forEach(star =>{
            if (!actor_list.includes(star)){
                result.push(star)
            }
        })

        setActorChoiceList(result)
        setFilteredActorChoiceList(result)
    },[actor_list])

    return (
        <div className='admin-content-display'>
            <div className='admin-cd-image-input'>
                <label htmlFor="image_input">Image:  </label>
                <input id ='admin-cd-film-image' name='image_input' type="file" />
            </div>

            <div className='admin-cd-title-input-container'>
                <input type="text" placeholder='Film Title' value={film_title}
                       onChange={(event)=>{setFilmTitle(event.target.value)}}
                       className='admin-cd-title-input'/>
            </div>
            <div className='admin-cd-description-input-container'>
                <textarea className='admin-cd-description-input' value={film_description}
                          placeholder='Film Description'
                          onChange={(event)=>{setFilmDescription(event.target.value)}}></textarea>
            </div>

            <div className='admin-cd-actor-director-list-container'>
                <div className='admin-cd-actor-section-container'>
                    <div className='admin-cd-fstar-section'>
                        <div className='admin-cd-fstar-section-name'> Actors</div>
                        {actor_choice_open? <div className='admin-cd-fstar-open-list close'
                                                 onClick={()=>{setActorChoiceOpen(false)}}
                            > Close </div>
                            : <div className='admin-cd-fstar-open-list open'
                                   onClick={()=>{setActorChoiceOpen(true);setDirectorChoiceOpen(false)}}>Open </div>}
                        {actor_choice_open?
                            <div className='admin-cd-fstar-choice-list-container'>
                                <input type="text" placeholder='Filter'
                                       className='admin-cd-fstar-choice-list-searchbar'
                                       onChange={(event)=>{filter_actors(event.target.value)}}
                                />
                                <div className='admin-cd-fstar-choice-list-title'>
                                    Choices:
                                </div>
                                <div className='admin-cd-fstar-choice-list'>
                                    {filtered_actor_choice_list.map(actor=>{
                                        return(
                                            <div key={actor.id} className='admin-cd-fstar-display' onClick={()=>{add_actor(actor)}}>
                                                <img src={api_path+'filmstar/'+actor.id+'/picture'} alt="" className='admin-cd-fstar-display-image'/>
                                                <div key={actor.id} className='admin-cd-fstar-display-name'> {actor.name + ' '+ actor.lastname} </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            :
                            <div className='admin-cd-choosen-fstar-list'>
                                {actor_list.map(actor=>{
                                    return(
                                        <div key={actor.id} className='admin-cd-fstar-display'>
                                            <img src={api_path+'filmstar/'+actor.id+'/picture'} alt="" className='admin-cd-fstar-display-image'/>
                                            <div key={actor.id} className='admin-cd-fstar-display-name'> {actor.name + ' '+ actor.lastname} </div>
                                            <div className='admin-cd-fstar-display-delete ' onClick={()=>{delete_actor(actor)}}>Delete</div>
                                        </div>
                                    )
                                })}
                            </div>}
                    </div>
                </div>
                <div className='admin-cd-director-section-container'>

                    <div className='admin-cd-fstar-section'>
                        <div className='admin-cd-fstar-section-name'> Directors</div>
                        {director_choice_open? <div className='admin-cd-fstar-open-list close'
                                                    onClick={()=>{setDirectorChoiceOpen(false)}}
                            >Close </div>
                            : <div className='admin-cd-fstar-open-list open'
                                   onClick={()=>{setDirectorChoiceOpen(true);setActorChoiceOpen(false)}}>  Open </div>}

                        {director_choice_open?
                            <div className='admin-cd-fstar-choice-list-container'>
                                <input type="text" placeholder='Filter'
                                       className='admin-cd-fstar-choice-list-searchbar'
                                       onChange={(event)=>{filter_directors(event.target.value)}}
                                />
                                <div className='admin-cd-fstar-choice-list-title'>
                                    Choices:
                                </div>
                                <div className='admin-cd-fstar-choice-list'>
                                    {filtered_director_choice_list.map(director=>{
                                        return(
                                            <div key={director.id} className='admin-cd-fstar-display' onClick={()=>{add_director(director)}}>
                                                <img src={api_path+'filmstar/'+director.id+'/picture'} alt="" className='admin-cd-fstar-display-image'/>
                                                <div key={director.id} className='admin-cd-fstar-display-name'> {director.name + ' '+ director.lastname} </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            :
                            <div className='admin-cd-choosen-fstar-list'>
                                {director_list.map(director=>{
                                    return(
                                        <div key={director.id} className='admin-cd-fstar-display'>
                                            <img src={api_path+'filmstar/'+director.id+'/picture'} alt="" className='admin-cd-fstar-display-image'/>
                                            <div key={director.id} className='admin-cd-fstar-display-name'> {director.name + ' '+ director.lastname} </div>
                                            <div className='admin-cd-fstar-display-delete ' onClick={()=>{delete_director(director)}}>Delete</div>
                                        </div>
                                    )
                                })}
                            </div>}

                    </div>

                </div>
            </div>

            <div className='admin-cd-footer-button-container'>
                {mode === options.CreateFilm ?
                    <div className='admin-cd-button-container'>
                        <div className='admin-cd-button cancel' onClick={()=>{clear()}}>Clear</div>
                        <div className='admin-cd-button submit' onClick={()=>{submit(false)}}>Submit</div>
                    </div>:
                    <div className='admin-cd-button-container'>
                        <div className='admin-cd-button cancel' onClick={()=>{cancel()}}>Cancel</div>
                        <div className='admin-cd-button submit' onClick={()=>{submit(true)}}>Submit</div>
                    </div>
                }
            </div>
        </div>
    )
}
