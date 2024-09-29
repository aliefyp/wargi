export interface Response {
  data: Daum[]
  meta: Meta
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

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
