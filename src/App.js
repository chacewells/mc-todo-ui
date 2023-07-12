import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import TodoTable from "./TodoTable";

const apiBaseUrl = "http://localhost:3001";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newItemDescription, setNewItemDescription] = useState("");

    useEffect(() => {
        setIsLoaded(false);
        axios.get(`${apiBaseUrl}/todo`).then(response => {
            setTodoList(response.data);
            setIsLoaded(true);
        });
    }, []);

    const handleAddTodo = (e) => {
        e.preventDefault();
        axios.post(`${apiBaseUrl}/todo`, {
            description: newItemDescription
        }).then(response => {
            setTodoList([...todoList, response.data]);
            setNewItemDescription("");
        });
    };

    const handleToggleDone = (todoItem) => {
        axios.put(`${apiBaseUrl}/todo/${todoItem.id}`, {
            done: !todoItem.done
        }).then(() => {
            const index = todoList.findIndex(item => item.id == todoItem.id);
            setTodoList([...todoList.slice(0, index), {
                ...todoItem,
                done: !todoItem.done
            }, ...todoList.slice(index + 1)]);
        });
    };

    if (!isLoaded) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="App">
            <h1>Todo List</h1>
            <TodoTable title={"Todo"} items={todoList.filter(i => !i.done)} onToggleDone={handleToggleDone}>
                <tr>
                    <td><input type="text" value={newItemDescription}
                               onInput={e => setNewItemDescription(e.currentTarget.value)}/></td>
                    <td><input type="button" value={"+"} onClick={handleAddTodo}/></td>
                </tr>
            </TodoTable>
            <hr/>
            <TodoTable title={"Done"} items={todoList.filter(i => i.done)} onToggleDone={handleToggleDone}/>
        </div>
    );
}

export default App;
