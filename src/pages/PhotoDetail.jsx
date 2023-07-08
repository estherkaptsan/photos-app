import { Component, useEffect, useState } from 'react'
import { pictureService } from '../services/picture.service'
import { Link, useNavigate, useParams } from 'react-router-dom'

export function PhotoDetails(props) {
    console.log('photo details', props)
    const [photo, setphoto] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadphoto()
    }, [params.id])

    async function loadphoto() {
        try {
            const photo = await pictureService.getPictureById(params.id)
            setphoto(photo)
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onBack() {
        navigate('/')
    }

    console.log('render');

    if (!photo) return <div>Loading...</div>
    return (
        <section className='photo-details'>
            <section>
                <h3> {photo.title}</h3>
                <img src={photo.imgUrl} />
            </section>


            {/* <Link to="/photo/r3">Next photo</Link> */}
            <button onClick={onBack}>Back</button>
        </section>
    )
}
