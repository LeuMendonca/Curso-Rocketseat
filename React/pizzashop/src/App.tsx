import './globals.css'
import {  RouterProvider } from "react-router-dom"
import { router } from "./routes/routes"
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'


export function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="pizzashop-theme">

      <HelmetProvider>
        <Helmet titleTemplate='%s | pizza.shop'/>
        <Toaster richColors />
        <RouterProvider router={ router } />
      </HelmetProvider>
    </ThemeProvider>
  )
}
