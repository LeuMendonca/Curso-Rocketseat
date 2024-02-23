import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import Summary from "../../components/Sumamary";
import { SearchForm } from "./components";
import { TransactionsContainer, TransactionsTable , PriceHighLight } from "./styles";

interface TransactionsProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string,
  price: number,
  createdAt: Date
}

export function Transactions() {

  const [ transactions , setTransactions ] = useState<TransactionsProps[]>([])

  async function getApiTransactions(){
    const response = await fetch("http://localhost:3000/transactions")
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => { 
    getApiTransactions()
  },[])

  return (
    <div>
        <Header/>
        <Summary/>

        <TransactionsContainer>
          <SearchForm/>

          <TransactionsTable>
            <tbody>
            { transactions.map( item => (
              <tr key={item.id}>
                <td width="50%">{ item.description}</td>
                <td><PriceHighLight variant={ item.type }>R$ { item.price.toFixed(2).replace(".",",") }</PriceHighLight></td>
                <td>{ item.category }</td>
                <td>{ item.createdAt }</td>
              </tr>
            )) 
            }
              
            </tbody>
          </TransactionsTable>
        </TransactionsContainer>
    </div>
  )
}
