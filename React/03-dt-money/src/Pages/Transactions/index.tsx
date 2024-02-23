import { useContext } from "react";
import { Header } from "../../components/Header";
import Summary from "../../components/Sumamary";
import { SearchForm } from "./components";
import { TransactionsContainer, TransactionsTable , PriceHighLight } from "./styles";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

export function Transactions() {
  const { transactions } = useContext(TransactionContext)  

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
                <td>
                  <PriceHighLight variant={ item.type }>
                    { item.type === "outcome" && "- " }
                    { priceFormatter.format(item.price) }
                  </PriceHighLight></td>
                <td>{ item.category }</td>
                <td>{ dateFormatter.format( new Date(item.createdAt)) }</td>
              </tr>
            )) 
            }
              
            </tbody>
          </TransactionsTable>
        </TransactionsContainer>
    </div>
  )
}
