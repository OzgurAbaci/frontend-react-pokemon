import React, {useEffect, useState} from 'react';
import axios from 'axios';
import defaultimage from '../../assets/image-not-avialable.png'
import './PokemonCard.css'

export function PokemonCard({url, toggleError}){

    const [data, setData] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            try{
                const result = await axios.get(url);
                setData(result.data);
            } catch (e){
                toggleError(true);
            }

        }

        fetchData()

    },[url])

    if(data){
        const {name, sprites, moves, weight, abilities } = data;
        const capitalName = name.charAt(0).toUpperCase() + name.slice(1);
        return (
            <article className='pokemon-card'>
                <h3>{capitalName}</h3>
                <img src={sprites.front_default || defaultimage} width='96px' alt={data.name}/>
                <p><span className='prop-name'>Moves: </span>{moves.length}</p>
                <p><span className='prop-name'>Weight: </span>{weight}</p>
                <div className='prop-name'>Abilities</div>
                <ul className='abilities-list'>
                    {abilities.map((ability) =>{
                        //console.log(ability.ability)
                        return <li className='ability' key = {ability.ability.name}>{ability.ability.name}</li>
                    })}
                </ul>
            </article>

        )
    } else{
        return <article />
    }

}

