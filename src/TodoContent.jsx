import { useEffect } from 'react'
import checkBox from './assets/check-box.png'
import done from './assets/done.png'

export function TodoContent({ todos, setTodos, todoInputRef, render, setRender, setHeaderList, input, setInput }) {

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    if (input.trim() !== '') {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    };
  };

  function saveInputText(e) {
    setInput(e.target.value);
  }; 

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  function handleDelete(index) {
    setTodos((prevTodos) => {
      const updated = [...prevTodos];
      updated.splice(index, 1);
      return updated;
    });
  }

  function handleRenderDelete(index) {
    setRender((prevRender) => {
      if (!prevRender) return prevRender;

      const updatedTodos = [...prevRender.todo];
      updatedTodos.splice(index, 1);

      setHeaderList((prevHeaderList) =>
        prevHeaderList.map((header) =>
          header.id === prevRender.id
            ? { ...header, todo: updatedTodos }
            : header
        )
      );

      return {
        ...prevRender,
        todo: updatedTodos,
      };
    });
  }


  function handleRenderKeyDown(e) {
    if (e.key === 'Enter') {
      handleRenderAddTodo();
    }
  }

  function handleRenderAddTodo() {
    if (!render || input.trim() === '') return;

    const newTodo = { text: input.trim(), completed: false };

    const updatedRender = {
      ...render,
      todo: [...render.todo, newTodo],
    };
    setRender(updatedRender);

    setHeaderList((prev) =>
      prev.map((list) =>
        list.id === render.id
          ? { ...list, todo: [...list.todo, newTodo] }
          : list
      )
    );
    setInput('');
  }

  function toggleTodoComplete(index) {
  setTodos((prev) => {
    const updated = [...prev];
    updated[index] = { ...updated[index], completed: !updated[index].completed };
    return updated;
  });
}

function toggleRenderTodoComplete(index) {
  setRender((prevRender) => {
    if (!prevRender) return prevRender;

    const updatedTodos = [...prevRender.todo];
    updatedTodos[index] = { 
      ...updatedTodos[index], 
      completed: !updatedTodos[index].completed 
    };

    setHeaderList((prevHeaderList) =>
      prevHeaderList.map((header) =>
        header.id === prevRender.id
          ? { ...header, todo: updatedTodos }
          : header
      )
    );

    return { ...prevRender, todo: updatedTodos };
  });
}



  return (
    <>
      <div className="todo-input">
        {render ? ( 
          <>
        <input
          ref={todoInputRef}
          placeholder='Write a task...'
          value={input}
          onChange={saveInputText}
          onKeyDown={handleRenderKeyDown} />
        <button onClick={handleRenderAddTodo}>Add</button>
        </>
        ) : (
        <>
        <input
          ref={todoInputRef}
          placeholder='Write a task...'
          value={input}
          onChange={saveInputText}
          onKeyDown={handleKeyDown} />
        <button onClick={handleAddTodo}>Add</button>
        </>)}
      </div>
      <div className='todo-content'>
        {render ? (
          [...render.todo].reverse().map((todo, idx) => {
            const realIndex = render.todo.length - 1 - idx;
            return (
              <div key={idx} className="todo-content-container">
                <p className={`todo-content-p ${todo.completed ? "completed" : ""}`}>
                  <img 
                  src={todo.completed ? done : checkBox} 
                  alt="checkbox" 
                  onClick={() => toggleRenderTodoComplete(realIndex)}
                  /> {todo.text}
                </p>
                <button onClick={() => handleRenderDelete(realIndex)}>delete</button>
              </div>
            )
          })
        ) : (
          [...todos].reverse().map((todo, idx) => {
            const realIndex = todos.length - 1 - idx;
            return (
              <div key={idx} className="todo-content-container">
                <p className={`todo-content-p ${todo.completed ? "completed" : ""}`}>
                  <img 
                  src={todo.completed ? done : checkBox} 
                  alt="checkbox" 
                  onClick={() => toggleTodoComplete(realIndex)}
                  /> {todo.text}
                </p>
                <button onClick={() => handleDelete(realIndex)}>delete</button>
              </div>
            )
          })
        )}

      </div>
    </>
  )
}

