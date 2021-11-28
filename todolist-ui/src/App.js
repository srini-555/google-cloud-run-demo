import './App.css';
import {useEffect, useState} from "react";

//const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = 'https://todolist-api-u6hkgtth3q-el.a.run.app';

function App() {
  const [todos, setTodos] = useState([]);


  const fetchTodos = () => {
    fetch(`${API_BASE_URL}/api/todos`)
        .then((res) => res.json())
        .then((json) => {
          setTodos(json);
        });
  };
  useEffect(()=>{
      fetchTodos();
  },[]);

  const createTodoHandler = (content) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content })
    };
    fetch(`${API_BASE_URL}/api/todos`, requestOptions)
        .then((res) => res.json())
        .then(() => {
          fetchTodos();
        });
  }

    const deleteTodoHandler = (id) => {
        const requestOptions = {
            method: 'DELETE'
        };
        fetch(`${API_BASE_URL}/api/todos/${id}`, requestOptions)
            .then(() => {
                fetchTodos();
            });
    }

  return (
    <div className="App">
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Navbar</span>
            </div>
        </nav>
        <div className={'container'}>
            <NewTodoForm createTodoHandler={createTodoHandler}/>
            <TodoList todos={todos} deleteTodoHandler={deleteTodoHandler} />
        </div>
    </div>
  );
}

const NewTodoForm = (props) => {
  const [content, setContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    props.createTodoHandler(content);
    setContent("");
  }
  return (
      <div style={{'paddingTop': 10}}>
          <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={e => handleSubmit(e)}>
              <div className="col-12">
                  <input
                      id="content"
                      placeholder={"Enter todo content"}
                      className="form-control col-md-12"
                      value={content}
                      onChange={e => setContent(e.target.value)}
                  />
              </div>

              <div className="col-12">
                  <button type="submit" className="btn btn-primary">Add</button>
              </div>
          </form>
      </div>
  );
}

const TodoList = (props) => {
  return (
      <div className={'container'}>
          <table className="table">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Todo</th>
                  <th scope="col">Delete</th>
              </tr>
              </thead>
              <tbody>
              {props.todos.map(todo => <TodoItem key={todo.id} todo={todo} deleteTodoHandler={props.deleteTodoHandler}/>)}
              </tbody>
          </table>

      </div>
  );
}

const TodoItem = ({todo, deleteTodoHandler}) => {
  return (
      <tr>
          <th scope="row">{todo.id}</th>
          <td>{todo.content}</td>
          <td><button type="button" className="btn btn-danger" onClick={e => deleteTodoHandler(todo.id)}>Delete</button></td>
      </tr>
  );
}

export default App;
