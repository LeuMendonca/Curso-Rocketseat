import { useEffect, useState } from "react";
import { TransactionsProps } from "../contexts/TransactionsContext"


export function useSummary(transactions: TransactionsProps[]){

    const [income, setIncome] = useState(0);
    const [outcome, setOutcome] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let newIncome = 0;
        let newOutcome = 0;
        let newTotal = 0;

        transactions.forEach(item => {
            switch (item.type) {
                case "income":
                    newIncome += item.price;
                    newTotal += item.price;
                    break;
                case "outcome":
                    newOutcome += item.price;
                    newTotal -= item.price;
                    break;
                default:
                    break;
            }
        });

        // Atualiza os estados com os novos valores calculados
        setIncome(newIncome);
        setOutcome(newOutcome);
        setTotal(newTotal);
    }, [transactions]);

    return {
        income ,
        outcome,
        total
    }
}