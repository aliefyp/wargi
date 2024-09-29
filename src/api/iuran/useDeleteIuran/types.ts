export interface Response {
  data: Data
  meta: Meta
  error: Error
}

export interface Data {
  id: number
}

export interface Meta {}


export interface Error {
  status: number
  name: string
  message: string
  details: Details
}

export interface Details {}
