import { createContext, useContext, useState } from 'react'

const todos = createContext({})

function FormListaTarefas(){

    const { activeCycle , setActiveCycle } = useContext(todos)

    return ( 
        <>
            <h3>Formulario de tarefas: {activeCycle}</h3>

            <button onClick={ () => setActiveCycle(previus => previus + 2)}>Alterar</button>
        </>
    )
}

function ListaTarefas(){

    const { activeCycle , setActiveCycle } = useContext(todos)

    return (
        <>
            <h3>Lista de tarefas {activeCycle}</h3>

        </>
    )
}

export function Home(){

    const [activeCycle , setActiveCycle ] = useState(0)

    return(
        <todos.Provider value={ { activeCycle , setActiveCycle } }>
            Página Inicial
            
            <FormListaTarefas/>
            <ListaTarefas/>
        </todos.Provider>
    )
}