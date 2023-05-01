import '../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MisFinanzas',
  description: '"Mis Finanzas: la herramienta en línea para gestionar tus gastos e ingresos de manera sencilla y eficaz. Controla tus finanzas personales, establece metas de ahorro, y administra tus compras y gastos en equipo. Con estadísticas detalladas y gráficos intuitivos, podrás llevar un seguimiento de tus ingresos y gastos diarios, semanales y mensuales. ¡Optimiza tus finanzas y toma el control de tu vida financiera con Mis Finanzas!"',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
