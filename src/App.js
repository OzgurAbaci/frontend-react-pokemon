import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {PokemonCard} from "./Components/Molecules/PokemonCard";

function App() {

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState(null);
    const [error, toggleError] = useState(false)


    useEffect(() => {

            async function fetchData() {
                try {
                    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
                    setData(result.data);
                    //console.log(result.data);
                    toggleError(false)
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
        <div>
            {/*list the pokemon in a simple list*/}

            {/*<ul>*/}
            {/*    {data && data.results.map((result) => <li key={result.name}>{result.name}</li>)}*/}
            {/*</ul>*/}

            {/*Show the offset*/}
            {/*<div>*/}
            {/*    {offset}*/}
            {/*</div>*/}

            <button type='button' onClick={
                () => {
                    //console.log(nextDataURI);
                    if (offset !== 0) {
                        setOffset(offset - 20)
                    }
                }
            }>previous
            </button>
            <button type='button' onClick={
                () => {
                    //console.log(nextDataURI);
                    if (data && offset + 20 <= data.count) {
                        setOffset(offset + 20)
                    }
                }
            }>next
            </button>
            {data && data.results.map((result) => {
                return <PokemonCard url={result.url} key={result.url}/>
            })}
            <StatusInfo />

        </div>
    );
}

export default App;
