import { ReactNode, createContext, useReducer, useState } from "react"

interface CreateCycleData{
    task: string
    minutesAmount: number
}

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishDate?: Date
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecoundPassed: ( seconds:number) => void
    createNewCycle: ( data: CreateCycleData ) => void
    interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
    children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }:CyclesContextProviderProps){
 
    const [cycles, dispatch ] = useReducer(( state: Cycle[] , action: any ) => {
        return state
     } , [])

    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

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

    function setSecoundPassed(seconds:number){
    setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) {
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
    
        // reset()
      }

      function interruptCurrentCycle(){
        setCycles(state => state.map( cycle => {
          if( cycle.id === activeCycleId ){
            return { ...cycle , interruptedDate: new Date() }
          }else{
            return cycle
          }
        }))
    
        setActiveCycleId( null )
      }

    return(
        <CyclesContext.Provider value={{ activeCycle , activeCycleId, markCurrentCycleAsFinished ,amountSecondsPassed , setSecoundPassed , createNewCycle , interruptCurrentCycle , cycles }}>
            { children }
        </CyclesContext.Provider>
    )
}