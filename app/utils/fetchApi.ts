type fetchApiProps = {
  title: string
  year: string
}

export const fetchApi = async ({ title, year }: fetchApiProps) => {
  const url = `/api/fetch-movie-data?title=${encodeURIComponent(
    title,
  )}&year=${encodeURIComponent(year)}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}
