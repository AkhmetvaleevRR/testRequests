import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Request, RequestFormData } from './types'
import { useLocalStorage } from '@/shared/utils/useLocalStorage'

const { getItem, setItem } = useLocalStorage<Request[]>('requests')

export const useRequestStore = defineStore('requests', () => {
  const requests = ref<Request[]>(getItem() || [])

  const getRequestById = computed(() => (id: string) => {
    return requests.value.find((request) => request.id === id)
  })

  function addRequest(requestData: RequestFormData) {
    const newRequest: Request = {
      ...requestData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }

    requests.value = [...requests.value, newRequest]
    setItem(requests.value)
  }

  function updateRequest(id: string, requestData: RequestFormData) {
    requests.value = requests.value.map((request) =>
      request.id === id
        ? {
            ...request,
            ...requestData,
          }
        : request,
    )
    setItem(requests.value)
  }

  function deleteRequest(id: string) {
    requests.value = requests.value.filter((request) => request.id !== id)
    setItem(requests.value)
  }

  return {
    requests,
    getRequestById,
    addRequest,
    updateRequest,
    deleteRequest,
  }
})
