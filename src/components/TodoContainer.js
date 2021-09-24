import React from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { Route, Switch } from "react-router-dom";
import About from "../pages/About"
import NotMatch from "../pages/NotMatch"
import Navbar from "./Navbar";

class TodoContainer extends React.Component {
  state = {
    todos: JSON.parse(localStorage.getItem('todo_list')) || {},
   };

   setLocalStorage = (todos) => {
     localStorage.setItem('todo_list', JSON.stringify(todos))
   }

   handleChange = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      }),
    }), () => 
    this.setLocalStorage(this.state.todos));
  };

  delTodo = id => {
    this.setState({
      todos: [
        ...this.state.todos.filter(todo => {
          return todo.id !== id;
        })
      ]
    }, () =>
    this.setLocalStorage(this.state.todos));
  };

  addTodoItem = title => {
    const newTodo = {
      id: this.state.todos.length + 1,
      title: title,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    }, () => this.setLocalStorage(this.state.todos));
  };

  setUpdate = (updatedTitle, id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.title = updatedTitle
        }
        return todo
      }),
    }, () => this.setLocalStorage(this.state.todos));
  }

   render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <div className="container">
              <div className="inner">
                <Header />
                <InputTodo addTodoProps={this.addTodoItem} />
                <TodosList
                  todos={this.state.todos}
                  handleChangeProps={this.handleChange}
                  deleteTodoProps={this.delTodo}
                  setUpdate={this.setUpdate}
                />
              </div>
            </div>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="*">
            <NotMatch />
          </Route>
        </Switch>
      </>
    );
  }
}
export default TodoContainer