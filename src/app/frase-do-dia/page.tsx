'use client'

import { useState, useEffect } from 'react'
import frasesData from '../../data/frases-motivacionais.json'

export default function FraseMotivacional() {
  const [frase, setFrase] = useState('')
  const [diaAtual, setDiaAtual] = useState(0)

  useEffect(() => {
    // Função para calcular o dia do ano (considerando anos bissextos)
    const getDiaDoAno = () => {
      const agora = new Date()
      const inicioAno = new Date(agora.getFullYear(), 0, 1)
      const diffTime = agora.getTime() - inicioAno.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }

    const dia = getDiaDoAno()
    setDiaAtual(dia)

    // Busca a frase correspondente ao dia do ano
    const fraseDoDia = frasesData[dia.toString() as keyof typeof frasesData]
    setFrase(fraseDoDia || frasesData['1']) // Fallback para o dia 1 se não encontrar
  }, [])

  return (
    <div className="min-h-screen bg-olive-green text-4xl flex items-center justify-center p-4">
      <p className="max-w-64 text-center">{frase}</p>
    </div>
  )
}
