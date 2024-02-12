import { FormEvent, useState } from 'react'
import styles from './FormTodo.module.css'
import { Todo } from './Todo';

interface Todo {
    title: string
    completed: boolean
}

export function FormTodo() {

    const [allTodos, setAllTodos] = useState<Array<Todo>>([])

    const [ newTodo, setNewTodo ] = useState("")

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if( !newTodo ) return;

        setAllTodos([...allTodos, { title: newTodo, completed: false }])

        setNewTodo("")
    }

    function completeTodo(text: string) {
        const updateTodos = allTodos.map(todo => {
            if (text === todo.title) {
                return { 
                    title: todo.title, 
                    completed: !todo.completed 
                }
            }
            return todo
        })

        setAllTodos(updateTodos)
    }

    function deleteTodo( text:string ){
        const deleteTodos = allTodos.filter(todo =>  text !== todo.title)

        console.log(deleteTodos)

        setAllTodos( deleteTodos )
    }
    

    return (
        <div className={styles.containerTodos}>
            <form className={styles.formTodo} onSubmit={handleSubmit}>
                <div className={styles.formControl}>
                    <input
                        type="text"
                        placeholder='Digite uma nova tarefa'
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />

                    <button type="submit" className={styles.btnAddTodo}>Adicionar</button>
                </div>

            </form>

            <div className={styles.listTodos}>

                <h2>Lista de Tarefas</h2>

                {allTodos.map((todo) => (
                    <Todo todo={todo} completeTodo={completeTodo} deleteTodo={ deleteTodo }/>
                ))}

            </div>
        </div>
    )
}
