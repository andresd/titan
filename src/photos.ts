const API_KEY = '45640711-3b2c9c3e0dd9ac6e6a5b798be'

const cache: Record<string, string[]> = {}

const cacheKey = (query: string, limit: number) => `${query}:${limit}`

export const getPhotos = async (query: string, limit = 10) => {
  if (cache[cacheKey(query, limit)]) {
    console.log('cache hit')
    return { list: cache[cacheKey(query, limit)], cacheHit: true }
  }

  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&per_page=${limit}`
  const response = await fetch(url)
  const data = await response.json()
  const list = data.hits.slice(0, limit).map((photo: any) => photo.webformatURL) as string[]

  cache[cacheKey(query, limit)] = list

  return { list, cacheHit: false }
}