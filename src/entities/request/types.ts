export interface Request {
  id: string
  title: string
  description: string
  category: RequestCategory
  createdAt: Date
}

export type RequestCategory = 'Первая' | 'Вторая' | 'Третья' | 'Другая'

export type RequestFormData = Omit<Request, 'id' | 'createdAt'>
