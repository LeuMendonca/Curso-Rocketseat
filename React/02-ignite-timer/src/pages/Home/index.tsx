import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from "./styles";

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
  }

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Tarefa não informada"),
    minutesAmount: zod.number().min(1, "Valor minimo: 1").max(60, "Valor máximo: 60")
  })

  type FormCycleProps = zod.infer<typeof newCycleFormValidationSchema>

  const { register, handleSubmit, watch, reset } = useForm<FormCycleProps>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  useEffect(() => {

    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle]);

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
    setActiveCycleId( null )

    setCycles(cycles.map( cycle => ))
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
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
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            list="task-suggestions"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
            disabled={ !!activeCycle}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={2}
            {...register('minutesAmount', { valueAsNumber: true })}
            disabled={ !!activeCycle }
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{second[0]}</span>
          <span>{second[1]}</span>
        </CountdownContainer>

        { activeCycle ? (
          <StopCountdownButton type="button">
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
