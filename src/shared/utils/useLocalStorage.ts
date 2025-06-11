export function useLocalStorage<T>(key: string) {
  const getItem = (): T | null => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  const setItem = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  return { getItem, setItem }
}
