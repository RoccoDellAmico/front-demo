const Todo = ({todo, index, deleteTodo}) => { //recibe de form una tarea y quiero que la muestre
  return (
    <>  
        <h3> 
            {todo} {/* lo que esta entre llaves es un valor de js*/}
        </h3> 
        <button onClick={()=>deleteTodo(index)}>x</button>
    </>
    // es hijo de Form
  );
}

export default Todo;