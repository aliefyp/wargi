import { Response } from "@/api/iuran/useGetAllIuran/types"
import { IURAN_TYPE } from "@/constants/iuran"
import { Button, Card, Checkbox, Chip, Input, Textarea } from "@nextui-org/react"
import dayjs from "dayjs"
import { useRef } from "react"
import { Controller, UseFormReturn } from "react-hook-form"
import { NumericFormat } from "react-number-format"
import { PembayaranFormType } from "../types"

interface Props extends UseFormReturn<PembayaranFormType> {
  showCheckbox?: boolean
  data: Response['data'][0]
  index: number
}

const PaymentItem = ({
  data,
  index,
  control,
  setValue,
  watch,
  setError,
  clearErrors,
  formState: { errors }
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentYear = dayjs().year();
  const yearOptions = [
    { key: String(currentYear - 3), label: String(currentYear - 3) },
    { key: String(currentYear - 2), label: String(currentYear - 2) },
    { key: String(currentYear - 1), label: String(currentYear - 1) },
    { key: String(currentYear), label: String(currentYear) },
  ]

  const monthOptions = [
    { key: '1', label: 'Januari' },
    { key: '2', label: 'Februari' },
    { key: '3', label: 'Maret' },
    { key: '4', label: 'April' },
    { key: '5', label: 'Mei' },
    { key: '6', label: 'Juni' },
    { key: '7', label: 'Juli' },
    { key: '8', label: 'Agustus' },
    { key: '9', label: 'September' },
    { key: '10', label: 'Oktober' },
    { key: '11', label: 'November' },
    { key: '12', label: 'Desember' },
  ];

  return (
    <Card shadow="none" fullWidth className="px-2 py-3 border border-zinc-300 text-left space-y-2">
      <div className="flex justify-between items-center gap-4 w-full cursor-pointer" onClick={() => setValue(`iuran.${index}.checked`, !watch(`iuran.${index}.checked`))}>
        <Controller
          control={control}
          name={`iuran.${index}.checked`}
          render={({ field }) => (
            <Checkbox
              isSelected={!!field.value}
              onValueChange={field.onChange}
            />
          )}
        />
        <div className="space-y-1 grow">
          <p className="text-md font-semibold">
            {data.attributes.iuran_name || ''}
          </p>
          <p className="text-sm text-zinc-500">
            {`${IURAN_TYPE[data.attributes.iuran_type || 'once']} - setiap tgl ${data.attributes.recurrence_date || 1}`}
          </p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <Chip color={data.attributes.is_mandatory ? "success" : "default"} size="sm">
            {data.attributes.is_mandatory ? 'Wajib' : 'Sukarela'}
          </Chip>
          <p className="text-md font-semibold text-warning-600">
            {data.attributes.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) || ''}
          </p>
        </div>
      </div>
      {watch(`iuran.${index}.checked`) && (
        <div className="grid grid-cols-12 gap-2 w-full">
          <Controller
            control={control}
            name={`iuran.${index}.amount`}
            rules={{
              required: 'Jumlah iuran tidak boleh kosong',
              validate: {
                positive: value => Number(value) > 0 || 'Jumlah iuran harus lebih dari 0'
              }
            }}
            render={({ field }) => (
              <NumericFormat
                isRequired
                thousandSeparator=","
                required
                label="Jumlah Iuran"
                placeholder="0"
                className="col-span-12"
                color={errors.iuran?.[index]?.amount ? "danger" : "default"}
                description={errors.iuran?.[index]?.amount ? errors.iuran?.[index]?.amount.message : ""}
                startContent={<span className="text-gray-600">Rp</span>}
                customInput={Input}
                defaultValue={data.attributes.amount}
                onValueChange={(values) => {
                  field.onChange(String(values.floatValue));
                }}
              />
            )}
          />

          {/* <Controller
            control={control}
            name={`iuran.${index}.payment_year`}
            rules={{
              required: 'Tahun pembayaran tidak boleh kosong'
            }}
            render={({ field }) => (
              <Select
                isRequired
                label="Tahun"
                className="col-span-4"
                color={errors.iuran?.[index]?.payment_year ? "danger" : "default"}
                description={errors.iuran?.[index]?.payment_year ? errors.iuran?.[index]?.payment_year.message : ""}
                selectedKeys={[field.value]}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              >
                {yearOptions.map(option => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name={`iuran.${index}.payment_month`}
            rules={{
              required: 'Bulan pembayaran tidak boleh kosong',
              min: {
                value: 1,
                message: 'Bulan pembayaran tidak boleh kosong'
              }
            }}
            render={({ field }) => (
              <Select
                isRequired
                selectionMode="multiple"
                label="Bulan"
                className="col-span-8"
                color={errors.iuran?.[index]?.payment_month ? "danger" : "default"}
                description={errors.iuran?.[index]?.payment_month ? errors.iuran?.[index]?.payment_month.message : ""}
                selectedKeys={field.value}
                onChange={(e) => {
                  field.onChange(
                    e.target.value
                      .split(',')
                      .filter(i => i.length > 0)
                      .sort((a, b) => Number(a) - Number(b))
                      .map(i => String(i))
                  );
                }}
              >
                {monthOptions.map(option => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>
            )}
          /> */}

          <Controller
            control={control}
            name={`iuran.${index}.note`}
            render={({ field }) => (
              <Textarea
                minRows={1}
                label="Catatan"
                placeholder=""
                color={errors.iuran?.[index]?.note ? "danger" : "default"}
                description={errors.iuran?.[index]?.note ? errors.iuran?.[index]?.note.message : ""}
                value={field.value}
                className="col-span-12"
                onChange={field.onChange}
              />
            )}
          />

          <div className="flex justify-between items-center w-full mt-4 col-span-12">
            <div className="block font-bold text-sm grow">Bukti Transfer</div>
            {watch(`iuran.${index}.attachments`).length > 0 && (
              <Button
                size="sm"
                color="danger"
                variant="light"
                onClick={() => {
                  setValue(`iuran.${index}.attachments`, [])
                  if (inputRef.current) {
                    inputRef.current.value = ""
                  }
                }}
              >
                Reset
              </Button>
            )}
          </div>

          <Controller
            control={control}
            name={`iuran.${index}.attachments`}
            rules={{
              required: 'Bukti transfer tidak boleh kosong',
            }}
            render={({ field }) => (
              <Input
                isRequired
                ref={inputRef}
                multiple
                accept=".png, .jpg, .jpeg"
                type="file"
                className="col-span-12"
                color={errors.iuran?.[index]?.attachments ? "danger" : "default"}
                description={
                  errors.iuran?.[index]?.attachments
                    ? errors.iuran?.[index]?.attachments.message
                    : "Hanya menerima format .png, .jpg, dan .jpeg. Bisa lebih dari 1 file, maks 2 MB per file"
                }
                onChange={(e) => {
                  const files = e.target.files || [];
                  if (files?.length > 5) {
                    setError(`iuran.${index}.attachments`, { message: 'Maksimal 5 file yang diperbolehkan' });
                    return;
                  } else if (files?.length === 0) {
                    setError(`iuran.${index}.attachments`, { message: 'File tidak boleh kosong' });
                    return;
                  } else if (Array.from(files).some(file => file.size > 2 * 1024 * 1024)) {
                    setError(`iuran.${index}.attachments`, { message: 'Ukuran file tidak boleh melebihi 2MB' });
                    return;
                  } else {
                    field.onChange(e.target.files);
                    clearErrors(`iuran.${index}.attachments`);
                  }
                }}
              />
            )}
          />
        </div>
      )}
    </Card >
  )
}

export default PaymentItem;