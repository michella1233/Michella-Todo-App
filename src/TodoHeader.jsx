import { useEffect } from "react"

export function TodoHeader({ title, setTitle, date, setDate, headerList, setHeaderList, todoInputRef, render, setRender, isDarkMode }) {

  function handleDateChange(e) {
    const newDate = e.target.value;

    if (render) {
      setRender((prevRender) => {
        if (!prevRender) return prevRender;
        return { ...prevRender, date: newDate };
      });

      setHeaderList((prevHeaderList) =>
        prevHeaderList.map((item) =>
          item.id === render.id ? { ...item, date: newDate } : item
        )
      );
    } else {
      setDate(newDate);
    }
  }


  useEffect(() => {
    localStorage.setItem('title', JSON.stringify(title));
  }, [title]);

  useEffect(() => {
    localStorage.setItem('date', JSON.stringify(date));
  }, [date]);


  useEffect(() => {
    localStorage.setItem("headerList", JSON.stringify(headerList));
  }, [headerList]);



  function handleTitleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault(); // stop new line
      todoInputRef.current?.focus(); // move focus
    }
  }

  function handleTitleChange(e) {
    const newTitle = e.target.value;

    if (render) {
      setRender((prevRender) => {
        if (!prevRender) return prevRender;
        return { ...prevRender, title: newTitle };
      });

      setHeaderList((prevHeaderList) =>
        prevHeaderList.map((item) =>
          item.id === render.id ? { ...item, title: newTitle } : item
        )
      );
    } else {
      setTitle(newTitle);
    }
  }


  return (
    <div className='todo-header'>
      <textarea
        className={isDarkMode? 'todo-title-dark':'todo-title'}
        maxLength={60}
        placeholder="Enter your awesome title..."
        onChange={handleTitleChange}
        value={render ? render.title : title}
        onKeyDown={handleTitleKeyDown}
      />
      <input
        className='add-date'
        type='date'
        value={render ? render.date : date}
        onChange={handleDateChange}
      />
    </div>
  )
}