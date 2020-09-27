import React,{useEffect,useState} from 'react'

const Form = ({ setStatus,inputText, setInputText, todos, setTodos }) => {
    
    const [currentDateTime, setCurrentDateTime] = useState('')

    const setDateTime = () => {
        let date = (new Date()).toLocaleDateString()
        let time = (new Date()).toLocaleTimeString()
        let dateTime = date + "," + time
        setCurrentDateTime(dateTime)
    }

    useEffect(() => {
        setInterval(() => {
            setDateTime()
        }, 1000);
    })

    const inputTextHandler = e => {
        // console.log(e.target.value)
        setInputText(e.target.value)
    }

    const submitTodoHandler = e => {
        e.preventDefault()
        setDateTime()
        setTodos([
            ...todos,
            {
                id: currentDateTime,
                text: inputText,
                completed: false,
            }
        ])
        setInputText("")
    }

    const statusHandler = e => {
        // console.log(e.target.value)
        setStatus(e.target.value)
    }
    return (
        <form>
            <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input"/>
            <button onClick={submitTodoHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <div className="select">
                <select onChange={statusHandler} name="todos" className="filter-todo" id="">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    )
}

export default Form

