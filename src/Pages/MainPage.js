import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Route, Switch, useParams, useHistory} from "react-router-dom";
import './MainPage.css';
import {PokemonCard} from "../Components/Molecules/PokemonCard";

function MainPage() {

    const history = useHistory();

    //get offset from url, force it to be an integer and catch
    //some possible erroneous input
    let {offset} = useParams();
    offset = parseInt(offset);
    if (offset <= 0) {
        offset = 0;
        history.push('/')
    }
    if (!offset) {
        offset = 0;
    }

    // const [offset, setOffset] = useState(browserOffset);
    const [data, setData] = useState(null);
    const [error, toggleError] = useState(false);
    const [hasNext, toggleHasNext] = useState(true);
    const [hasPrevious, toggleHasPrevious] = useState(false);


    useEffect(() => {

            const cancelTokenSource = axios.CancelToken.source();
            async function fetchData() {
                try {
                    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`, {cancelToken: cancelTokenSource.token});
                    setData(result.data);
                    toggleError(false)
                    if (result.data.previous === null) {
                        toggleHasPrevious(false);
                    } else {
                        toggleHasPrevious(true);
                    }
                    if (result.data.next === null) {
                        toggleHasNext(false);
                    } else {
                        toggleHasNext(true);
                    }
                } catch (e) {
                    toggleError(true);
                    console.error(e)
                }

            }

            setData(null);
            fetchData();

            return ()=>{
                cancelTokenSource.cancel();
            }
        }
        ,
        [offset]
    )

    function StatusInfo() {
        if (error) {
            return <div>Something went wrong</div>
        } else if (data === null) {
            return <div>Loading...</div>
        } else {
            return null;
        }
    }


    return (
        <>
            <div className="buttoncontainer">
                <button type='button' disabled={!hasPrevious} onClick={
                    () => {
                        let newOffset = offset - 20
                        if (newOffset < 0) {
                            newOffset = 0;
                        }
                        if (newOffset === 0) {
                            history.push('/');
                            // setOffset(newOffset);
                        } else {
                            history.push(`/${newOffset}`)
                            // setOffset(newOffset);
                        }

                    }
                }>
                    Previous
                </button>
                <button type='button' disabled={!hasNext} onClick={
                    () => {
                        //the next line contains a useless substraction to prevent 10 + 20 = 1020
                        //because javascript can't distinguish between strings and integers
                        let newOffset = offset + 20;
                        history.push(`/${newOffset}`)
                        // changeURL(newOffset)
                        // setOffset(newOffset);
                    }
                }>
                    Next
                </button>
            </div>
            <Switch>
                <Route path='/'>
                    <div className='pokemon-container'>
                        {data && data.results.map((result) => {
                            return <PokemonCard url={result.url} key={result.url}/>
                        })}
                        <StatusInfo/>
                    </div>
                </Route>
            </Switch>
        </>
    );
}

export default MainPage;
