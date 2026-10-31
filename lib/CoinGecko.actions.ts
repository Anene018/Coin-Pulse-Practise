'use server'
import qs from 'query-string'

const BASE_URL = process.env.COINGECKO_BASE_URL
const API_KEY = process.env.COIN_GECKO_API_KEY

if (!BASE_URL)
  throw new Error('Missing COINGECKO_BASE_URL environment variable')
if (!API_KEY) throw new Error('Missing COIN_GECKO_API_KEY environment variable')

export async function fetcher<T> (
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL!.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`,
      query: params
    },
    { skipEmptyString: true, skipNull: true }
  )

  const response = await fetch(url, {
    headers: {
      'x-cg-demo-api-key': API_KEY,
      'Content-Type': 'application/json'
    } as Record<string, string>,
    next: { revalidate }
  })

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response
      .json()
      .catch(() => ({}))

    throw new Error(
      `API Error: ${response.status}: ${errorBody.error || response.statusText}`
    )
  }

  return response.json()
}
