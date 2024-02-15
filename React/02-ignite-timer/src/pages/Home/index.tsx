import { HandPalm, Play } from "phosphor-react";

import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'

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
}

export const CyclesContext = createContext({ activeCycle } as CyclesContextType)

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)



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

  

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider value={ activeCycle , activeCycleId }>
          <NewCycleForm/>

          <Countdown />
        <CyclesContext.Provider/>

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
