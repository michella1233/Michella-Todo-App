import './App.css'
import profilePicture from './assets/avatar4.png'
import sun from './assets/sun.png'
import moon from './assets/moon.png'
import hamburger from './assets/hamburger.png'
import hamburgerDark from './assets/hamburgerDark.png'
import { TodoContent } from './TodoContent'
import { CreateNewList } from './CreateNewTitle'
import { TodoHeader } from './TodoHeader'
import { useState, useEffect } from 'react'
import { useRef } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState(() => {
    const saved = localStorage.getItem('title');
    return saved ? JSON.parse(saved) : "";
  });

  const [input, setInput] = useState('');

  const [date, setDate] = useState(() => {
    const saved = localStorage.getItem('date');
    return saved ? JSON.parse(saved) : "";
  });

  const [headerList, setHeaderList] = useState(() => {
    const saved = localStorage.getItem("headerList");
    return saved ? JSON.parse(saved) : [];
  });

  const todoInputRef = useRef(null);

  const [render, setRender] = useState(null)

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("isDarkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    };
    localStorage.setItem('isDarkMode', isDarkMode)
  }, [isDarkMode]);


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }


  return (
    <div className={"container"}>
      <div 
      className={`left-container ${isSidebarOpen ? "active" : ""} ${isDarkMode ? "left-container-dark" : ""}`}  
      id="sidebar">
        <div className='profile-container'>
          <img className='pp' src={profilePicture} />
          <p className={isDarkMode ? 'profile-dark' : 'profile-light'}>My Todo List</p>
        </div>
        <CreateNewList
          title={title}
          date={date}
          setDate={setDate}
          setTitle={setTitle}
          headerList={headerList}
          setHeaderList={setHeaderList}
          todos={todos}
          setTodos={setTodos}
          setRender={setRender}
          render={render}
          setInput={setInput}
          isDarkMode={isDarkMode}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className='right-container'>
        <img
          onClick={toggleSidebar}
          className='hamburger'
          src={isDarkMode ? hamburgerDark : hamburger}
        />
        <div className='right-container-header'>
          <div>
            <TodoHeader
              title={title}
              date={date}
              setTitle={setTitle}
              setDate={setDate}
              headerList={headerList}
              setHeaderList={setHeaderList}
              setTodos={setTodos}
              todoInputRef={todoInputRef}
              render={render}
              setRender={setRender}
              isDarkMode={isDarkMode}
            />
          </div>
          <div className='background-mode'>
            <img
              className='sun'
              src={isDarkMode ? moon : sun}
              onClick={() => setIsDarkMode(!isDarkMode)}
            />
          </div>
        </div>
        <div className='right-container-body'>
          <TodoContent
            todos={todos}
            setTodos={setTodos}
            todoInputRef={todoInputRef}
            render={render}
            setRender={setRender}
            setHeaderList={setHeaderList}
            input={input}
            setInput={setInput}
          />
        </div>
      </div>
    </div>
  )
}

export default App
