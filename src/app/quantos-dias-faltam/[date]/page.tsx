'use client'

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
})

interface CountdownPageProps {
  params: Promise<{
    date: string
  }>
}

export default function CountdownPage({ params }: CountdownPageProps) {
  const [daysLeft, setDaysLeft] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  // Usar React.use() para acessar os parâmetros (agora são Promise)
  const resolvedParams = use(params)

  useEffect(() => {
    // Extrair a data dos parâmetros da URL (formato DD-MM-YYYY)
    const dateParts = resolvedParams.date.split('-')
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0])
      const month = parseInt(dateParts[1]) - 1 // JavaScript usa meses de 0-11
      const year = parseInt(dateParts[2])

      const targetDate = new Date(year, month, day)
      const today = new Date()

      // Calcular a diferença em dias
      const timeDiff = targetDate.getTime() - today.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

      setDaysLeft(Math.max(0, daysDiff))
    }
    setIsLoading(false)
  }, [resolvedParams.date])

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-olive-green text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div
      className={`w-full h-screen bg-white flex items-center justify-center p-4 ${playfairDisplay.variable}`}
    >
      {/* Conteúdo principal com proporção quadrada */}
      <div className="w-full max-w-md aspect-square bg-white flex flex-col items-center justify-center">
        {/* Banner dentro do quadrado */}
        <div className="w-3/4 -mb-24">
          <Image
            src="/banner-countdown-h.png"
            alt="Banner Countdown"
            width={300}
            height={150}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>

        {/* Apenas o número de dias e dia/dias */}
        <div className="text-olive-green text-[12rem] font-bold -mb-12 font-serif">
          {daysLeft}
        </div>

        <div className="text-olive-green text-3xl font-semibold text-center font-serif">
          {daysLeft === 1 ? 'dia' : 'dias'}
        </div>
      </div>
    </div>
  )
}
