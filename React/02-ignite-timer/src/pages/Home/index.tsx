import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'

import { createContext, useState } from "react";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import Countdown from "./components/Coutdown";

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecoundPassed: ( seconds:number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

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

  function markCurrentCycleAsFinished(){
    setCycles(
      state => state.map( cycle => {
        if( cycle.id === activeCycleId ){
          return { ...cycle , finishDate: new Date()}
        }else{
           return cycle
        }
      })
    )
  }

  function handleCreateNewCycle(data: FormCycleProps) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles(state => [...state, newCycle])

    setActiveCycleId(id)

    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle(){
    setCycles(state => state.map( cycle => {
      if( cycle.id === activeCycleId ){
        return { ...cycle , interruptedDate: new Date() }
      }else{
        return cycle
      }
    }))

    setActiveCycleId( null )
  }

  function setSecoundPassed(seconds:number){
    setAmountSecondsPassed(seconds)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider value={{ activeCycle , activeCycleId, markCurrentCycleAsFinished ,amountSecondsPassed , setSecoundPassed }}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm/>
          </FormProvider> 

          <Countdown />
        </CyclesContext.Provider>

        { activeCycle ? (
          <StopCountdownButton onClick={ handleInterruptCycle } type="button">
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
