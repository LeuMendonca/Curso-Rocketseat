import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from '@radix-ui/react-radio-group';

import { Content, Overlay, Title , Close, TransactionsType, TransactionsTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";


export function NewTransactionModal() {
  return (
    <Dialog.Portal>
        <Overlay/>

        <Content>
          <Title>Nova Transação</Title>
          <Close>
            <X size={ 24 }/>
          </Close>

          <form action="">
            <input type="text" placeholder="Descrição" required/>
            <input type="number" placeholder="Preço" required/>
            <input type="text" placeholder="Categoria" required/>

            <TransactionsType>
              
              <TransactionsTypeButton variant="entradas" value="entradas">
                <ArrowCircleUp size={24}/>Entradas
              </TransactionsTypeButton>

              <TransactionsTypeButton variant={"saidas"} value="saidas">
                <ArrowCircleDown size={24}/>
                Saidas
              </TransactionsTypeButton>

            </TransactionsType>

            <button type="submit">Cadastrar</button>
          </form>

        </Content>
    </Dialog.Portal>
  )
}
