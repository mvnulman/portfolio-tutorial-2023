export const fetchHygraphQuery = async <T>(
  query: string,
  revalidate?: number,
): Promise<T> => {
  const url = process.env.HYGRAPH_URL

  // CI builds run without CMS credentials. Returning an empty payload keeps the
  // build working instead of crashing while collecting page data.
  if (!url) {
    console.warn('[hygraph] HYGRAPH_URL is not set; skipping CMS data')
    return {} as T
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
    next: {
      revalidate,
    },
    body: JSON.stringify({
      query,
    }),
  })

  const { data } = await response.json()

  return data
}
