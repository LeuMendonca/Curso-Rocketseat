import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function MounthCanceledOrdersAmountCard() {
  return (
    <Card>
        <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Cancelamentos Janeiro</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>

        <CardContent className="space-y-1">
            <span className="text-2xl font-bold tracking-tight">3</span>
            <p className="text-xs text-muted-foreground">
                <span className="text-rose-500 dark:text-rose-400">-10%</span> em relação ao mês passado
            </p>
        </CardContent>
    </Card>
  )
}
