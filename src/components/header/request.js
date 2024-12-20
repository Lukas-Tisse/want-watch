export default async function requestAPI(inputNameValue, inputYearValue) {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  try {
    const url = inputYearValue
      ? `https://www.omdbapi.com/?t=${inputNameValue}&y=${inputYearValue}&apikey=${key}`
      : `https://www.omdbapi.com/?t=${inputNameValue}&apikey=${key}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    console.error("Erro ao buscar dados na API:", error);
    throw error;
  }
}
