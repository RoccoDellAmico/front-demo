import { useState } from "react";
import Todo from "./Todo";

const Form = () => {
    const [todo, setTodo] = useState(''); //estado que representa a la nueva tarea, setTodo actualiza el estado

    const [todos, setTodos] = useState([]) 
    // el set es de la palabra que puse antes
    // se van a guardar las tareas pendientes, las tareas son objetos
    //cada vez que se llama a useState, se renderiza el componente con los cambios nuevos
    
    //hay que mapear los estados uno por uno para visualziarlos
    
    const handleChange = (e) => setTodo(e.target.value) // asi se harian muchos llamados
    const handleClick = () => {
        if(todo.trim() === ""){
            alert("No puedes agregar una tarea vacia")
            return;
        }
        setTodos([...todos, { todo }]); //agrega una nueva tarea al array de tareas
    }//trim elimina los espacios en blanco 

    const deleteTodo = index => {
        const newTodos = [...todos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
    }
    return (
        <>
        <form onSubmit={(e) => e.preventDefault()}>
            <label> Agregar tarea </label> <br />
            <input type="text" name="todo" onChange={handleChange}></input>
            <button onClick={handleClick}>agregar </button>
            {todos.map((value, index) => (
                <Todo todo = {value.todo} key={index} index={index} deleteTodo={deleteTodo} /> 
            )
            )}
        </form>
        </>
        // mediante el map pasamos una instancia de todo que tiene un estado asociado
    );
};

export default Form;