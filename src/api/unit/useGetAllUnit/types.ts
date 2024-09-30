export interface Response {
  data: Daum[]
  meta: Meta
  error: Error
}

export interface Daum {
  id: number
  attributes: Attributes
}

export interface Attributes {
  unit_name: string
  owner_name: string
  occupant_name: string
  owner_phone_number: string
  occupant_phone_number: string
  is_active: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
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

export interface Error {
  status: number
  name: string
  message: string
  details: Details
}

export interface Details {}