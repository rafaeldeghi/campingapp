import React, { useState} from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.png';

import './styles.css';

export default function New({ history }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [place, setPlace] = useState('');
    const [activities, setActivities] = useState('');
    const [price, setPrice] = useState('');


    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('place', place);
        data.append('activities', activities);
        data.append('price', price);

        await api.post('/spot', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"  />
            </label>

            <label htmlFor="place">LUGAR *</label>
            <input 
                id="place"
                placeholder="Seu lugar incrível"
                value={place}
                onChange={event => setPlace(event.target.value)}
            />
            <label htmlFor="activities">ATIVIDADES * <span>(separadas por vírgula)</span></label>
            <input 
                id="activities"
                placeholder="Quais atividades estão preparadas?"
                value={activities}
                onChange={event => setActivities(event.target.value)}
            />
            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input 
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>            
        </form>
    )
}