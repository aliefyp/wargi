export interface IuranFormType {
  iuran_name: string;
  iuran_type: string;
  amount: number;
  description: string;
  due_date: string;
  is_mandatory: boolean;
  recurrence_date: number;
  recurrence_month: number;
}