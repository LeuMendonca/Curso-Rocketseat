import styles from './Todo.module.css'

export function Todo({ todo , completeTodo , deleteTodo }) {

    function handleBtnComplete(){
        console.log(todo)
        completeTodo(todo.title)
    }

    function handleBtnDelete(){
        deleteTodo(todo.title)
    }

  return (
    <div className={ styles.todo }>
        <h3 className={ todo.completed ? `${styles.completed}` : ""}>{ todo.title }</h3>
        
        <div className={ styles.buttons }>
            <button 
                className={ styles.btnComplete }
                onClick={ handleBtnComplete }
            >
                    { !todo.completed ? "Completar" : "Descompletar" }
            </button>

            <button 
                className={ styles.btnDelete }
                onClick={ handleBtnDelete }
            >
                Excluir
            </button>
        </div>
    </div>
  )
}
