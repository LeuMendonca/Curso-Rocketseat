import { ReactNode, createContext, useEffect, useState } from "react"

export interface TransactionsProps {
    id: number
    description: string
    type: 'income' | 'outcome'
    category: string,
    price: number,
    createdAt: Date
}

interface TransactionsContextType {
    transactions: TransactionsProps[]
}

interface TransactionsProviderProps{
    children: ReactNode
}

export const TransactionContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({children}:TransactionsProviderProps){
    const [ transactions , setTransactions ] = useState<TransactionsProps[]>([])

    async function getApiTransactions(){
        const response = await fetch("http://localhost:3000/transactions")
        const data = await response.json()

        setTransactions(data)
    }

    useEffect(() => { 
        getApiTransactions()
    },[])

    return(
        <TransactionContext.Provider value={{ transactions }}>
            {children}
        </TransactionContext.Provider>
    )
}