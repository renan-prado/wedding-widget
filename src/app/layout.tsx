import type { Metadata } from 'next'
import { Lavishly_Yours } from 'next/font/google'
import './globals.css'

const lavishlyYours = Lavishly_Yours({
  variable: '--font-lavishly-yours',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Widget para casamentos',
  description: 'Widget para casamentos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${lavishlyYours.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
