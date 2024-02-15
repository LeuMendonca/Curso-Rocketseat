import React, { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns';
import { CyclesContext } from '../..';

export default function Countdown() {

  const {activeCycle , activeCycleId } = useContext(CyclesContext)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
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

  
  useEffect(() => {

    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secoundsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

        if( secoundsDifference >= totalSeconds ){
          setCycles(
            state => state.map( cycle => {
              if( cycle.id === activeCycleId ){
                return { ...cycle , finishDate: new Date()}
              }else{
                 return cycle
              }
            })
          )

          setAmountSecondsPassed( totalSeconds )
          clearInterval(interval)
        }else{
          setAmountSecondsPassed(secoundsDifference)
        }
      }, 1000)

      
  
    }
    
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle,totalSeconds,activeCycleId]);


    return (
    <CountdownContainer>
    <span>{minutes[0]}</span>
    <span>{minutes[1]}</span>
    <Separator>:</Separator>
    <span>{second[0]}</span>
    <span>{second[1]}</span>
</CountdownContainer>
    )
}
        
        
        