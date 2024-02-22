import { Header } from "../../components/Header";
import Summary from "../../components/Sumamary";
import { SearchForm } from "./components";
import { TransactionsContainer, TransactionsTable , PriceHighLight } from "./styles";


export function Transactions() {
  return (
    <div>
        <Header/>
        <Summary/>

        <TransactionsContainer>
          <SearchForm/>

          <TransactionsTable>
            <tbody>
              <tr>
                <td width="50%">Desenvolvimento de site</td>
                <td><PriceHighLight variant="income">R$ 12.000,00</PriceHighLight></td>
                <td>Venda</td>
                <td>13/02/2024</td>
              </tr>

              <tr>
                <td width="50%">Merenda</td>
                <td><PriceHighLight variant="outcome">-R$ 35,00</PriceHighLight></td>
                <td>Alimentação</td>
                <td>15/02/2024</td>
              </tr>

              <tr>
                <td width="50%">Aluguel do apartamento</td>
                <td><PriceHighLight variant="income">R$ 1.200,00</PriceHighLight></td>
                <td>Moradia</td>
                <td>18/02/2024</td>
              </tr>
            </tbody>
          </TransactionsTable>
        </TransactionsContainer>
    </div>
  )
}
