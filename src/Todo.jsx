import { useEffect, useState } from 'react';

function Todo() {
  const [inputs, setInputs] = useState({});
  const [inputArr, setInputArr] = useState([]);
  const [toggleEdit, settoggleEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    const storedInputArr = JSON.parse(localStorage.getItem('inputDetailItems'));
    
    setInputArr(storedInputArr);
  }, []);

  useEffect(() => {
    localStorage.setItem('inputDetailItems', JSON.stringify(inputArr));
  }, [inputArr]);

  function handlechange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const now = new Date();
    // console.log(now);
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    const todoItem = { ...inputs, date: formattedDate, time: formattedTime };
    if (inputs.todoname && inputs.todoDescription && editIndex === null) {
      setInputArr(arrVal => ([...arrVal, todoItem]));
    } else {
      const updatedArr = [...inputArr];
      updatedArr[editIndex] = todoItem;
      setInputArr(updatedArr);
      setEditIndex(null);
    }
    setInputs({});
    settoggleEdit(false);
  }

  function handleDelete(index) {
    let newArr = [...inputArr];
    newArr.splice(index, 1);
    setInputArr(newArr);
  }

  function handleEdit(index) {
    let newArr = [...inputArr];
    setInputs(newArr[index]);
    setEditIndex(index);
    settoggleEdit(true);
  }


  return (
    <div className='todo_main'>
      <form onSubmit={handleSubmit}>
        <h1>Todo List</h1>
        <label>*Enter Todo</label> 
        <input type="text" placeholder='Enter Todo' name="todoname" value={inputs.todoname || ""} onChange={handlechange} required autoComplete='off'/> <br />
        <label>*Enter Todo Description</label>
        <textarea name="todoDescription" id="" cols="30" rows="5" value={inputs.todoDescription || ""} onChange={handlechange} placeholder='*Enter Todo Description' required/> <br />
         <select name="color" id="" value={inputs.color || ""}  onChange={handlechange}>
          <option value="">Select Color</option>
          <option value= "lightcoral">Light Crimson</option>
          <option value="yellow">Yellow</option>
          <option value="lightGreen" >Light Green</option>
         </select> <br /> <br />
        {toggleEdit ? <button className='editBtn'>Edit</button> : <button>Submit </button>}
      </form> <br />

      <div style={{ marginTop: "2rem" }} className='todo_box_container'>
          {inputArr.map((item, index) => {
            return (
              <div key={index} style={{backgroundColor:item.color}} className='todo_box'>
                <h2>{item.todoname}</h2>
                <p><span> Todo Despription : </span>{item.todoDescription}</p>
                <p>Date: {item.date}</p>
                <p>Current Time: {item.time}</p>
                <div className='btnContainer'>
                <p><button onClick={() => { handleDelete(index) }}><i class="fa-solid fa-trash-can"></i></button></p>
                <p><button onClick={() => { handleEdit(index) }}><i class="fa-solid fa-pen-to-square"></i></button></p>
                </div>
              </div>
            )
          })
          }
      </div>
    </div>
  )
}

export default Todo;
