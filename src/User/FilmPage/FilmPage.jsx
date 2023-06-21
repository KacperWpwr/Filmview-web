import {useEffect, useState} from "react";
import {getFilmDisplay, getFilmReviews} from "../../Requests/Other/Film";
import {api_path} from "../../Requests/Path";


export function FilmPage({logged}){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [rating,setRating] = useState('')
    const [actors,setActors] = useState([])
    const [directors,setDirectors] = useState([])
    const [reviews, setReviews] = useState([])
    const [already_reviewed , setAlreadyReviewed] = useState(false)
    const[star_list, setStarList] = useState([1,2,3,4,5,6,7,8,9,10])
    const [star_amount, setStarAmount] = useState(0)
    const [review_text, setReviewText] = useState('')
    const get_review_list_class = () =>{
        if(already_reviewed){
            return 'usr-fp-review-list-container-rev'
        }else {
            return 'usr-fp-review-list-container-nrev'
        }
    }

    const send_review = async () =>{
        if(!logged){
            window.location.pathname='/login'
        }else{

        }
    }

    useEffect(()=>{
        const fetch_data = async ()=>{
            const title = sessionStorage.getItem('usr-current-film')
            console.log(title)

            const result = await getFilmDisplay(title)
            const body = await result.json()

            if(result.ok){
                setTitle(title)
                setDescription(body.description)
                setRating(body.rating)
                setActors(body.actors)
                setDirectors(body.directors)
                const result_reviews = await getFilmReviews(title)
                const body_reviews = await result_reviews.json()

                if(result_reviews.ok){
                    setReviews(body_reviews.ratings)
                }else{
                    alert(body.detail)
                }
            }else{
                alert(body.detail)
            }
        }

        fetch_data()

    },[])


    return(
        <div className='usr-fp-container'>
            <div className='usr-fp-film-side'>
                <div className='usr-fp-fs-title-img-container'>
                    <div className='usr-fp-fs-img-container'>
                        <img src={api_path+'film/'+title+'/picture'} className='usr-fp-fs-img'/>
                    </div>
                    <div className='usr-fp-fs-title-container'>
                        {title}
                    </div>
                </div>
                <div className='usr-fp-fs-description-container'>
                    <div className='usr-fp-fs-description-title'>
                        Description:
                    </div>
                    <div className='usr-fp-fs-description'>
                        {description}
                    </div>
                </div>
                <div className='usr-fp-fs-star-display-container'>
                    <div className='usr-fp-fs-star-display-title'>
                        Actors:
                    </div>
                    <div className='usr-fp-fs-star-display-list'>
                        {actors.map(actor=>{
                            return(
                                <div key = {actor.id} className='usr-fp-fs-star-display'>
                                    <img className='usr-fp-fs-star-display-img' src={api_path+'filmstar/'+actor.id+'/picture'} alt=""/>
                                    <div className='usr-fp-fs-star-display-name' >
                                        {actor.name+" "+actor.lastname}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='usr-fp-fs-star-display-container'>
                    <div className='usr-fp-fs-star-display-title'>
                        Directors:
                    </div>
                    <div className='usr-fp-fs-star-display-list'>
                        {directors.map(director=>{
                            return(
                                <div key = {director.id} className='usr-fp-fs-star-display'>
                                    <img className='usr-fp-fs-star-display-img' src={api_path+'filmstar/'+director.id+'/picture'} alt=""/>
                                    <div className='usr-fp-fs-star-display-name' >
                                        {director.name+" "+director.lastname}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
            <div className='usr-fp-review-side'>
                {already_reviewed? <> </> :
                <div className='usr-fp-review-input-container'>
                    <div className='usr-fp-input-star-container'>
                        {star_list.map(star=>{
                            return(
                                <div className={star<=star_amount? 'usr-fp-input-star-checked': 'usr-fp-input-star'}
                                     onClick={()=>{setStarAmount(star)}}>
                                    <i className='fa fa-star fa-2x'></i>
                                </div>
                            )
                        })}

                    </div>
                    <textarea className='usr-fp-review-input-text' onInput={(event)=>{setReviewText(event.target.value)}}></textarea>
                    <div className='usr-fp-review-button-container'>
                        <button className='usr-fp-review-button' disabled={star_amount<1} onClick={send_review}>
                            Submit review
                        </button>
                    </div>
                </div>}
                <div className={get_review_list_class()}>
                    <div className='usr-fp-review-list-title'>
                        Reviews
                    </div>
                    <ul className='usr-fp-review-list'></ul>
                </div>
            </div>
        </div>
    )
}