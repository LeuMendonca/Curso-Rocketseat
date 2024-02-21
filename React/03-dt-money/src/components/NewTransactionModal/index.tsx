import * as Dialog from "@radix-ui/react-dialog";
import { Overlay } from "./styles";

export default function NewTransactionModal() {
  return (
    <Dialog.Portal>
        <Overlay/>

        <Dialog.Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <Dialog.Close>X</Dialog.Close>
        </Dialog.Content>
    </Dialog.Portal>
  )
}
