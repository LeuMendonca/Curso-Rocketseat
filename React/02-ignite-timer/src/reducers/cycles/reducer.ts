import { produce } from "immer"
import { ActionTypes } from "./actions"

interface CyclesStates {
    cycles: Cycle[]
    activeCycleId: string | null
  }

export interface Cycle {
id: string
task: string
minutesAmount: number
startDate: Date
interruptedDate?: Date
finishedDate?: Date
}  

export function cyclesReducers( state: CyclesStates , action: any ){

  const currentCycleIndex = state.cycles.findIndex( ( cycle ) => {
    return cycle.id === state.activeCycleId
  })

    switch( action.type ){
        case ActionTypes.ADD_NEW_CYCLE:
          // return {
          //   ...state , 
          //   cycles: [...state.cycles , action.payload.newCycle ],
          //   activeCycleId: action.payload.newCycle.id
          // }
          return produce( state , draft => {
            draft.cycles.push(action.payload.newCycle)
            draft.activeCycleId = action.payload.newCycle.id
          })
          break
  
        case ActionTypes.INTERRUPT_CURRENT_CYCLE:

          if(currentCycleIndex < 0 ) return state;

          return produce( state , ( draft ) => {
            draft.activeCycleId = null
            draft.cycles[currentCycleIndex].interruptedDate = new Date();
          })

          break;
  
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:

          return produce( state , draft => {
            if(currentCycleIndex < 0 ) return state;
            draft.cycles[currentCycleIndex].finishedDate = new Date();
          })
          break
      }
      
      return state
}