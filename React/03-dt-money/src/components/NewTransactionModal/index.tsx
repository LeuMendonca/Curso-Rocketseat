import * as Dialog from "@radix-ui/react-dialog";
import * as z from 'zod'

import { Content, Overlay, Title , Close, TransactionsType, TransactionsTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newTransactionModalSchema = z.object({
  description: z.string().min(1,"O campo precisa ter no minimo 1 caractere").trim(),
  price: z.number().min(1,"Valor minimo exigido: 1"),
  category: z.string().min(1,"O campo precisa ter no minimo 1 caractere").trim()
  
})

type NewTraansactionInputs = z.infer< typeof newTransactionModalSchema >


export function NewTransactionModal() {

  const { register , handleSubmit , formState: { errors }} = useForm<NewTraansactionInputs>({
    resolver: zodResolver(newTransactionModalSchema),
  })

  function handleNewTransaction(data: NewTraansactionInputs){
    console.log(data)
  }

  return (
    <Dialog.Portal>
        <Overlay/>

        <Content>
          
          <Title>Nova Transação</Title>
          <Close>
            <X size={ 24 }/>
          </Close>

          <form onSubmit={handleSubmit(handleNewTransaction)}>
            <input 
              type="text" 
              placeholder="Descrição" 
              {...register('description')}  
              required
            />
            { errors.description && <span>{errors.description.message}</span> }
            
            <input 
              type="number" 
              placeholder="Preço" 
              {...register('price' ,  { valueAsNumber: true })}
              required
            />
            { errors.price && <span>{errors.price.message}</span> }

            <input 
              type="text" 
              placeholder="Categoria" 
              {...register('category')}
              required
            />
            { errors.category && <span>{errors.category.message}</span> }

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
