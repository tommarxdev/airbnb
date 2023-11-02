import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Nunito } from "next/font/google"
import Navbar from '@/components/navbar'
import RegisterModal from '@/components/modals/register-modal'
import ToasterProvider from './providers/toastr-provider'
import LoginModal from '@/components/modals/login-modal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from '@/components/modals/rentModal'
import SearchModal from '@/components/modals/search-modal'

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb',
}

const font = Nunito({
  subsets: ["latin"]
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className='pb-20 pt-20'>
        {children}
        </div>
        </body>
    </html>
  )
}
