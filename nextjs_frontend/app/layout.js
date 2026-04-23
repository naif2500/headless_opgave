import { cookies } from 'next/headers';
import Navbar from '../components/Navbar'
import { CartProvider } from '../context/CartContext'
import './globals.css'

export const metadata = {
  title: 'Folio — Brugte Boghandel',
  description: 'Kuratérte brugte bøger',
}

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token');
  const isLoggedIn = !!token;
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar isLoggedIn={isLoggedIn} />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}