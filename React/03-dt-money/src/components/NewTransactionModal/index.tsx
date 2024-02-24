import * as Dialog from "@radix-ui/react-dialog";
import * as z from 'zod'

import { Content, Overlay, Title, Close, TransactionsType, TransactionsTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";

const newTransactionModalSchema = z.object({
  description: z.string().min(1, "O campo precisa ter no minimo 1 caractere").trim(),
  price: z.number().min(1, "Valor minimo exigido: 1"),
  category: z.string().min(1, "O campo precisa ter no minimo 1 caractere").trim(),
  type: z.enum(["income", "outcome"])
})

type NewTraansactionInputs = z.infer<typeof newTransactionModalSchema>


export function NewTransactionModal() {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    reset
  } = useForm<NewTraansactionInputs>({
    resolver: zodResolver(newTransactionModalSchema),
    defaultValues: {
      type: "income"
    }
  })

  async function handleCreateNewTransaction(data: NewTraansactionInputs) {
    const { description , price , category , type } = data

    await api.post('transactions',{
      description,
      price,
      category,
      type,
      createdAt: new Date()
    })

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>

        <Title>Nova Transação</Title>
        <Close>
          <X size={24} />
        </Close>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            {...register('description')}
            required
          />
          {errors.description && <span>{errors.description.message}</span>}

          <input
            type="number"
            placeholder="Preço"
            {...register('price', { valueAsNumber: true })}
            required
          />
          {errors.price && <span>{errors.price.message}</span>}

          <input
            type="text"
            placeholder="Categoria"
            {...register('category')}
            required
          />
          {errors.category && <span>{errors.category.message}</span>}

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionsType onValueChange={ field.onChange } value={ field.value }>

                  <TransactionsTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />Entradas
                  </TransactionsTypeButton>

                  <TransactionsTypeButton variant={"outcome"} value="outcome">
                    <ArrowCircleDown size={24} />
                    Saidas
                  </TransactionsTypeButton>

                </TransactionsType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>Cadastrar</button>
        </form>

      </Content>
    </Dialog.Portal>
  )
}
