export interface PembayaranFormType {
  unit: string
  residence: string
  payment_method: number
  status: string
  payment_year: string
  payment_month: string[]
  iuran: {
    checked: boolean
    amount: string
    attachments: File[]
    note: string
  }[]
}