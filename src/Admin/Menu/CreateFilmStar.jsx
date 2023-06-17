import {useEffect, useState} from "react";
import {AddFilmStarPicture, CreateNewFimStar, EditFilmStar} from "../../Requests/Admin/FilmStar";
import {options} from "./AdminMenu";
import {getFilmDisplay} from "../../Requests/Other/Film";
import {getFilmStar} from "../../Requests/Other/FilmStar";

export function CreateFilmStar({mode,setMode}){
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')




    const submit = async ()=>{
        const result = await  mode===options.EditFilmStar ?
            await EditFilmStar(sessionStorage.getItem('admin-current-fs'),name,lastname): await CreateNewFimStar(name,lastname)
        const body = await result.json()

        const elem = document.getElementById('admin-cd-filmstar-image')
        if( result.ok){
            if(mode===options.EditFilmStar){
                alert('Film star updated successfully')
            }else{
                alert('Film star created successfully')
            }

            console.log(body)
            if(elem.files.length  > 0){
                const file = elem.files[0]
                console.log(file)
                const img_result = await AddFilmStarPicture(body.id,file)
                const img_body = await img_result.json()

                if(img_result.ok){

                    if(mode===options.EditFilmStar){
                        alert('Film star picture updated successfully')
                    }else{
                        alert('Film star picture added successfully')
                    }
                }else{
                    console.log(img_body)
                    alert(img_body.detail)
                }

            }
        }else{
            alert(body.detail)
        }
    }

    const clear = () =>{
        setName('')
        setLastname('')

        document.getElementById('admin-cd-filmstar-image').value = ''
    }

    useEffect(()=>{
        const fetch_data = async ()=>{
            const id = sessionStorage.getItem('admin-current-fs')

            const response = await getFilmStar(id)

            const body = await response.json()

            if(response.ok){
                setName(body.name)
                setLastname(body.lastname)
            }else{
                alert(body.detail)
            }
        }

        if(mode === options.EditFilmStar){
            if(!sessionStorage.getItem('admin-current-fs')){
                alert('Something went wrong!')
                sessionStorage.clear()
                window.location.pathname = '/admin'
            }

            fetch_data()
        }
    },[])


    return (
        <div className='admin-content-display'>
            <div className='admin-cd-image-input'>
                <label htmlFor="image_input">Image:  </label>
                <input id ='admin-cd-filmstar-image' name='image_input' type="file" />
            </div>

            <div className='admin-cd-test-input-container'>
                <input type="text" placeholder='Name' value={name}
                       onChange={(event)=>{setName(event.target.value)}}
                       className='admin-cd-test-input'/>
            </div>

            <div id='filmstar-lastanme-input' className='admin-cd-test-input-container'>
                <input type="text" placeholder='Last name' value={lastname}
                       onChange={(event)=>{setLastname(event.target.value)}}
                       className='admin-cd-test-input'/>

            </div>



            <div className='admin-cd-footer-button-container'>
                {mode === options.CreateFilmStar ?
                    <div className='admin-cd-button-container'>
                        <div className='admin-cd-button cancel' onClick={clear}>Clear</div>
                        <div className='admin-cd-button submit' onClick={submit}>Submit</div>
                    </div>:
                    <div className='admin-cd-button-container'>
                        <div className='admin-cd-button cancel' onClick={()=>{setMode(options.None)}}>Cancel</div>
                        <div className='admin-cd-button submit' onClick={submit}>Submit</div>
                    </div>
                }
            </div>
        </div>
    )
}