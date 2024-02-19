import  { useContext, useEffect} from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns';
import { CyclesContext } from '../../../../contexts/CyclesContext';

export default function Countdown() {

  const {activeCycle , activeCycleId ,  markCurrentCycleAsFinished , amountSecondsPassed , setSecondsPassed } = useContext(CyclesContext)

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
  },[activeCycle , minutes , second , markCurrentCycleAsFinished])

  
  useEffect(() => {

    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secoundsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

        if( secoundsDifference >= totalSeconds ){
          markCurrentCycleAsFinished()

          setSecondsPassed( totalSeconds )
          clearInterval(interval)
        }else{
          setSecondsPassed(secoundsDifference)
        }
      }, 1000)

      
  
    }
    
    return () => {
      clearInterval(interval)
    }
  }, [ activeCycle,totalSeconds,activeCycleId , setSecondsPassed ]);


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
        
        
        