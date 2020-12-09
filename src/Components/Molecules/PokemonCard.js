import React, {useEffect, useState} from 'react';
import axios from 'axios';
import defaultimage from '../../assets/image-not-avialable.png'

export function PokemonCard({url, toggleError}){

    const [data, setData] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            try{
                const result = await axios.get(url);
                setData(result.data);
            } catch (e){
            }

        }

        fetchData()

    },[url])

    if(data){
        return (
            <article>
                <h3>{data.name}</h3>
                <img src={data.sprites.front_default || defaultimage} width='100px' alt={data.name}/>
                <p><span className='prop-name'>Moves: </span>{data.moves.length}</p>
                <p><span className='prop-name'>Weight: </span>{data.weight}</p>
                <div className='prop-name'>Abilities</div>
                <ul className='abilities-list'>
                    {data.abilities.map((ability) =>{
                        //console.log(ability.ability)
                        return <li key = {ability.ability.name}>{ability.ability.name}</li>
                    })}
                </ul>
            </article>

        )
    } else{
        return <article />
    }

}

