export interface Response {
  data: Daum
  meta: Meta
  error?: Error
}

export interface Daum {
  id: number
  attributes: Attributes
}

export interface Attributes {
  iuran_name: string
  is_mandatory: boolean
  iuran_type: 'yearly' | 'monthly' | 'once'
  amount: number
  due_date: any
  createdAt: string
  updatedAt: string
  publishedAt: string
  recurrence_date: number
  recurrence_month: number
  description: string
}

export interface Meta {}

export interface Error {
  status: number
  name: string
  message: string
  details: Details
}

export interface Details {}
