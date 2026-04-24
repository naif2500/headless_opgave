import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Folio — Brugte Boghandel',
  description: 'Kuratérte brugte bøger',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
