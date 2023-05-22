import '../styles/globals.css'
import { Inter } from 'next/font/google'
import FixedTitle from '@/components/fixedTitle'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'digitalOrganizer',
  description: '"digitalOrganizer: la herramienta en línea para gestionar tus gastos e ingresos de manera sencilla y eficaz. Controla tus finanzas personales, establece metas de ahorro, y administra tus compras y gastos en equipo. ¡Optimiza tus finanzas y toma el control de tu vida financiera con digitalOrganizer!"',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <FixedTitle />
      <div style={{ marginTop: "85px" }}>
        {children}
      </div>
      </body>
    </html>
  )
}
