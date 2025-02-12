import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title')
  const year = searchParams.get('year')

  if (!title) {
    return NextResponse.json(
      { error: 'O parâmetro "title" é obrigatório' },
      { status: 400 },
    )
  }

  const key = process.env.API_KEY

  const omdbUrl = year
    ? `https://www.omdbapi.com/?t=${encodeURIComponent(
        title,
      )}&y=${encodeURIComponent(year)}&apikey=${key}`
    : `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${key}`

  try {
    const response = await fetch(omdbUrl)
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }
    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 })
  }
}
