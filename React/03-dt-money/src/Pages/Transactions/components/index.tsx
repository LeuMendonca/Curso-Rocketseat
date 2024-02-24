import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionContext } from "../../../contexts/TransactionsContext";

const searchFormSchema = z.object({
  query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {

  const { getApiTransactions } = useContext(TransactionContext)

  const { register , handleSubmit , formState: { isSubmitting } } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),

  })

  async function handleSearchTransactions(data: SearchFormInputs){
    
    await getApiTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={ handleSubmit(handleSearchTransactions) }>
        <input type="text" 
          {...register("query")}
          placeholder="Busque por transações"
        />

        <button type="submit" disabled={isSubmitting}>
            <MagnifyingGlass/>
            Buscar
        </button>
    </SearchFormContainer>
  )
}
