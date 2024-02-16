import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'

import { useContext } from "react";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import Countdown from "./components/Coutdown";
import { CyclesContext } from "../../contexts/CyclesContext";


export function Home() {

  const { createNewCycle , interruptCurrentCycle , activeCycle} = useContext(CyclesContext)

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Tarefa não informada"),
    minutesAmount: zod.number().min(1, "Valor minimo: 1").max(60, "Valor máximo: 60")
  })

  type FormCycleProps = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<FormCycleProps>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit , watch , reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle( data: FormCycleProps ){
    createNewCycle(data);
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        
          <FormProvider {...newCycleForm}>
            <NewCycleForm/>
          </FormProvider> 

          <Countdown />

        { activeCycle ? (
          <StopCountdownButton onClick={ interruptCurrentCycle } type="button">
            <HandPalm size={24} />
            Interromper
        </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
        )}
        
      </form>
    </HomeContainer>
  );
}
