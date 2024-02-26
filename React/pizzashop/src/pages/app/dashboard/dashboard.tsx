import { Helmet } from "react-helmet-async"
import { MounthRevenueCard } from "./mounth-revenue-card"
import { MounthOrdersAmountCard } from "./mounth-orders-amount-card"
import { DayOrdersAmountCard } from "./day-orders-amount-card"
import { MounthCanceledOrdersAmountCard } from "./mount-cancel-orders-amount"
import { RevenueChart } from "./revenue-chart"
import { PopularProductCharts } from "./popular-products-chart"


export function Dashboard() {
  return (
    <>
        <Helmet title="Dashboard"/>

        <div className="flex flow-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>

        <div className="grid grid-cols-4 gap-4">
            <MounthRevenueCard/>
            <MounthOrdersAmountCard/>
            <DayOrdersAmountCard/>
            <MounthCanceledOrdersAmountCard/>
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart/>
          <PopularProductCharts/>
        </div>
    </>
  )
}
