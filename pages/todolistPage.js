import React,{useContext,useState,useEffect} from 'react'
import Form from '../components/TODOLIST/Form'
import TodoList from '../components/TODOLIST/TodoList'
import { withRouter } from 'next/router'
import { AuthContext } from '../appState/AuthProvider'
import Router from 'next/router'

const todolistPage = ({ router }) => {
    const { user } = useContext(AuthContext)

    const [inputText, setInputText] = useState("")
    const [todos, setTodos] = useState([])
    const [status, setStatus] = useState("all")
    const [filteredTodos, setFilteredTodos] = useState([])


    const filterHandler = () => {
        switch (status) {
        case 'completed':
            setFilteredTodos(todos.filter(todo => todo.completed === true))
            break
        case 'uncompleted':
            setFilteredTodos(todos.filter(todo => todo.completed === false))
            break
        default:
            setFilteredTodos(todos)
            break
        }
    }

    //Run once when the app start
    useEffect(() => {
        getLocalTodos()
        if (!user) {
            Router.push('/signin')
        }
        if (router.pathname === '/todolistPage') {
            if ($('a').hasClass('nav-link')) {
                $('a').removeClass('active')
                $('#Todolist-btn').addClass('active')
            }
        }
    },[])

    useEffect(() => {
        
        filterHandler()
        saveLocalTodos()
    }, [todos, status])
    
    const saveLocalTodos = () => {
        localStorage.setItem('todos',JSON.stringify(todos))
    }

    const getLocalTodos = () => {
        if (localStorage.getItem('todos') === null) {
        localStorage.setItem('todos',JSON.stringify([]))
        } else {
        let todoLocal = JSON.parse(localStorage.getItem('todos'))
        setTodos(todoLocal)
        }
    }
    return (
        <>
            <div className="App-todoList">
                <header>
                    <h1>WhiteCanZE's Todo List</h1>
                </header>
                <Form
                    inputText={inputText}
                    todos={todos}
                    setTodos={setTodos}
                    setInputText={setInputText}
                    setStatus={setStatus}
                />
                <TodoList
                    setTodos={setTodos}
                    todos={todos}
                    filteredTodos ={filteredTodos}
                />
            </div>
        </>
    )
}

export default withRouter(todolistPage)
