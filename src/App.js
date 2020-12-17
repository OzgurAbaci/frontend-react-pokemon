import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainPage from "./Pages/MainPage.js";
import logo from "./assets/pokemon.png";
import './App.css';

function App() {
    return (
        <Router>
            <div className='main-app'>
                <img alt='' src={logo} id='logo'/>
                <Switch>
                    <Route exact path='/frontend-react-pokemon/'>
                        <MainPage/>
                    </Route>
                    <Route path='/frontend-react-pokemon/:offset'>
                        <MainPage/>
                    </Route>
                </Switch>
            </div>

        </Router>
    )
}

export default App