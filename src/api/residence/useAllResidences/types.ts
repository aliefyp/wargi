export interface Response {
  data: Daum[]
  meta: Meta
}

export interface Daum {
  id: number
  attributes: Attributes
}

export interface Attributes {
  residence_name: string
  address: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  address_province: any
  address_city: any
  address_district: any
  address_subdistrict: any
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
