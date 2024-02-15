import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'

export function NewCycleForm() {

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

  return (
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
  )
}
