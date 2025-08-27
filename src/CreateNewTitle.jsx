import plusSquare from './assets/plus-square.png'
import dayjs from 'dayjs'

export function CreateNewList({ title, setTitle, date, setDate, headerList, setHeaderList, todos, setTodos, setRender, render, setInput, isDarkMode }) {

  const formatted = dayjs().format("YYYY-MM-DD");

  function handleClickButton() {

    const newItem = {
      id: crypto.randomUUID(),
      title: title.trim() === "" ? "New list" : title,
      date: date ? date : formatted,
      todo: todos
    }

    setHeaderList([...headerList, newItem]);
    setDate("");
    setTitle("");
    setTodos([]);
    setRender(null);
    setInput('')
  }

  function selectedTitle(id) {
    const selectedItem = headerList.find((item) => item.id === id);

    if (selectedItem) {
      setRender(selectedItem);
    }
  }

  function handleDeleteHeader(id) {
    setHeaderList(prev => prev.filter(item => item.id !== id));

    if (render?.id === id) {
      setRender(null);
    }
  }

  function handleReset() {
    setTitle("");
    setDate("");
    setHeaderList([])
    setTodos([]);
    setDate('');
    setRender(null);
  }

  function handleDeleteNewTitle() {
    setTitle("");
    setDate("");
    setTodos([]);
    setInput("")
  }

  return (
    <>
      <div className='list-container'>
        {((todos && todos.length > 0) || title !== "" || date !== "") && (<div className='create-new-list-container'>
          <div className='date-container'>
            <div className='day'>{date ? dayjs(date).format("ddd") : dayjs().format('ddd')}</div>
            <div className='date'>{date ? dayjs(date).format("DD") : dayjs().format('DD')}</div>
          </div>
          <div
            onClick={() => setRender(null)}
            className={isDarkMode?'create-new-list-dark':'create-new-list'}>{title ? title : 'New list'}</div>
          <button className='headerlist-delete-button' onClick={handleDeleteNewTitle}>delete</button>
        </div>)}

        {[...headerList].reverse().map((item) => (
          <div key={item.id} className='create-new-list-container'>
            <div className='date-container date-container-none'>
              <div className='day'>{dayjs(item.date).format('ddd')}</div>
              <div className='date'>{dayjs(item.date).format('DD')}</div>
            </div>
            <div
              onClick={() => selectedTitle(item.id)}
              className={isDarkMode?'create-new-list-dark':'create-new-list'}>{item.title ? item.title : 'New title'}</div>
            <button className='headerlist-delete-button' onClick={() => handleDeleteHeader(item.id)}>delete</button>
          </div>
        ))}
      </div>
      <div className='plus-square-container'>
        <img className='plus-square' src={plusSquare}
          onClick={handleClickButton}
        />
        <button className='delete-all' onClick={handleReset}>Reset all</button>
      </div>

    </>
  )
}