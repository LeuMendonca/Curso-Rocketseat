import { ReactNode, createContext, useEffect, useState } from "react"
import { api } from "../lib/axios"

export interface TransactionsProps {
    id: number
    description: string
    type: 'income' | 'outcome'
    category: string,
    price: number,
    createdAt: Date
}

interface TransactionsContextType {
    transactions: TransactionsProps[],
    getApiTransactions: ( query?:string) => Promise<void>
}

interface TransactionsProviderProps{
    children: ReactNode
}

export const TransactionContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({children}:TransactionsProviderProps){
    const [ transactions , setTransactions ] = useState<TransactionsProps[]>([])

    async function getApiTransactions(query?: string){

       const response = await api.get('transactions',{
        params: {
            q: query
        }
       })

        setTransactions(response.data)
    }

    useEffect(() => { 
        getApiTransactions()
    },[transactions])

    return(
        <TransactionContext.Provider value={{ transactions , getApiTransactions }}>
            {children}
        </TransactionContext.Provider>
    )
}