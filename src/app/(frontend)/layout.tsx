import { Inria_Serif } from 'next/font/google'
import React from 'react'
import './styles.css'

// Initialize the Inria Serif font
const inriaSerif = Inria_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata = {
  description: 'AF Zine',
  title: 'AF Zine',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={inriaSerif.className}>
      <body className="">
        <main>{children}</main>
      </body>
    </html>
  )
}
