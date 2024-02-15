import { HandPalm, Play } from "phosphor-react";

import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import Countdown from "./components/Coutdown";

// interface FormCycleProps {
//   task: string
//   minutesAmount: number
// }

export function Home() {

  interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishDate?: Date
  }

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

  const currentSecounds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSecounds / 60)
  const secondAmount = currentSecounds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const second = String(secondAmount).padStart(2, '0')

  useEffect( () => {
    if( activeCycle ){
      document.title = `${minutes}:${second}`
    }
  },[activeCycle , minutes , second])

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm/>

        <Countdown activeCycle={ activeCycle } setCycles={ setCycles } activeCyclesId={ activeCycleId }/>

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
