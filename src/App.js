import logo from './logo.svg';
import './App.css';
import Header from "./MyComponents/Header";
import { AddTodo } from './MyComponents/AddTodo';
import { Footer } from "./MyComponents/Footer";
import { TodoItem } from "./MyComponents/TodoItem";
import { Todos } from "./MyComponents/Todos";
import React, { useEffect, useState } from 'react';
import { About } from "./MyComponents/About";
import ReactDOM from "react-dom/client";
import  registration_form  from "./MyComponents/registration_form";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I am onDelete of todo", todo);
    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.getItem("todos");
  }
  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc)
    let sno;
    if (todos.length == 0)
      sno = 0;
    else {
      let sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
    //if(localStorage.getItem("todos")){
    //localStorage.setItem("todos",JSON.stringify(todos));

  }
  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      < Router>
        <Header title="My Todos List" searchBar={true} />
        <registration_form />
        <Switch>
          <Route exact path="/" render={() => {
            return (
                <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} /> 
                </>
            )
          }}>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
        </Switch>

        <Footer />

      </Router >
    </>
  );
}

export default App;
