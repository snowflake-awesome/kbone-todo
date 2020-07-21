import React, { useState } from 'react'

import logo from './assets/images/logo.svg';
import './App.less';
import Game from './components/game-project';
import TodoApp from './components/todo-project';


function App() {
    return (
        <>
            {/* <img src={logo} className="app-logo" alt="logo" /> */}
            {/* <Game /> */}
            <TodoApp />
        </>
    );
}

export default App;
