import React from 'react'
import Footer from './Footer'
import Header from './AddTodo'
import TodoList from './TodoList'
import './todomvc-app-css/index.css'
import { addTodo } from './actions'


const App = () => (<div>
    <Header />
    <TodoList />
    <Footer />
</div>)


export default App
