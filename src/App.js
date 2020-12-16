import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {PokemonCard} from "./Components/Molecules/PokemonCard";
import logo from './assets/pokemon.png'

function App() {

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState(null);
    const [error, toggleError] = useState(false);
    const [hasNext, toggleHasNext] = useState(true);
    const [hasPrevious, toggleHasPrevious] = useState(false);


    useEffect(() => {

            async function fetchData() {
                try {
                    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
                    setData(result.data);
                    //console.log(result.data);
                    toggleError(false)
                    if (result.data.previous === null){
                        toggleHasPrevious(false);
                    } else{
                        toggleHasPrevious(true);
                    }
                    if (result.data.next === null){
                        toggleHasNext(false);
                    } else{
                        toggleHasNext(true);
                    }
                } catch (e) {
                    toggleError(true);
                    console.error(e)
                }

            }

            setData(null);
            fetchData();
        }
        ,
        [offset]
    )

    function StatusInfo(){
        if(error){
            return <div>Something went wrong</div>
        } else if(data === null){
            return <div>Loading...</div>
        } else{
            return null;
        }
    }

    return (
        <div className='main-app'>
            {/*list the pokemon in a simple list*/}

            {/*<ul>*/}
            {/*    {data && data.results.map((result) => <li key={result.name}>{result.name}</li>)}*/}
            {/*</ul>*/}

            {/*Show the offset*/}
            {/*<div>*/}
            {/*    {offset}*/}
            {/*</div>*/}

            <img alt='' src={logo} id='logo'/>
            <div className="buttoncontainer">
                <button type='button' disabled={!hasPrevious} onClick={
                    () => {
                        //console.log(nextDataURI);
                        // if (offset !== 0) {
                            setOffset(offset - 20)
                        // }
                    }
                }>Previous
                </button>
                <button type='button' disabled={!hasNext} onClick={
                    () => {
                        //console.log(nextDataURI);
                        // if (data && offset + 20 <= data.count) {
                            setOffset(offset + 20)
                        // }
                    }
                }>Next
                </button>
            </div>


            <div className='pokemon-container'>
                {data && data.results.map((result) => {
                    return <PokemonCard url={result.url} key={result.url}/>
                })}
                <StatusInfo />
            </div>


        </div>
    );
}

export default App;
