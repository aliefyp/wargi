export interface Payload {
  data: {
    iuran_name: string;
    iuran_type: string;
    amount: number;
    recurrence_date: number;
    description: string;
    due_date: string;
    is_mandatory: boolean;
    recurrence_month: number;
  }
}

export interface Response {
  data: Data
  meta: Meta
  error: Error
}

export interface Data {
  id: number
  attributes: Attributes
}

export interface Attributes {
  iuran_name: string
  amount: number
  description: string
  is_mandatory: boolean
  due_date: any
  createdAt: string
  updatedAt: string
  publishedAt: string
  recurrence_month: number
  recurrence_date: number
  iuran_type: string
}

export interface Meta {}


export interface Error {
  status: number
  name: string
  message: string
  details: Details
}

export interface Details {}
