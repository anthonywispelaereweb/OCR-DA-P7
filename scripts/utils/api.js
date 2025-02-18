const getData = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.statusText)
    } else {
      return await response.json()
    }
  } catch (error) {
      console.log('error', error)
  }
}