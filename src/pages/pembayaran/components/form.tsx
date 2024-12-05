import useGetAllIuran from "@/api/iuran/useGetAllIuran";
import useGetAllUnit from "@/api/unit/useGetAllUnit";
import { USER_UNIT } from "@/constants/local-storage-keys";
import { Button, Select, SelectItem, Spacer } from "@nextui-org/react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { PembayaranFormType } from "../types";
import PaymentItem from "./payment-item";

const PembayaranForm = () => {
  const form = useForm<PembayaranFormType>({
    defaultValues: {
      unit: localStorage.getItem(USER_UNIT) || '0',
      payment_year: dayjs().format('YYYY'),
      payment_month: [dayjs().format('M')],
    }
  })

  const { data: dataIuran } = useGetAllIuran();
  const iuranList = dataIuran?.data || [];

  const { data: dataUnit } = useGetAllUnit();
  const unitList = dataUnit?.data || [];

  const iuranOptions = iuranList.sort((a, b) => {
    return a.attributes.is_mandatory === b.attributes.is_mandatory ? 0 : a.attributes.is_mandatory ? -1 : 1
  });

  const submitForm = (val: PembayaranFormType) => {
    console.log(val);
  }

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


  useEffect(() => {
    if (iuranOptions.length) {
      form.setValue('iuran', iuranOptions.map(iuran => ({
        checked: false,
        amount: String(iuran.attributes.amount),
        attachments: [],
        note: '',
      })));
    }
  }, [iuranOptions, form.setValue]);

  return (
    <form noValidate onSubmit={form.handleSubmit(submitForm)}>
      <div className="grid grid-cols-2 gap-2">
        {dataUnit?.data.length && (
          <Controller
            control={form.control}
            name="unit"
            render={({ field }) => (
              <Select
                {...field}
                size="sm"
                label="Plih Unit"
                className="col-span-2"
                selectedKeys={[field.value]}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  localStorage.setItem(USER_UNIT, e.target.value);
                }}
              >
                {unitList.map(option => (
                  <SelectItem key={option.id}>{option.attributes.unit_name || ''}</SelectItem>
                ))}
              </Select>
            )}
          />
        )}

        <Controller
          control={form.control}
          name="payment_year"
          rules={{
            required: 'Tahun pembayaran tidak boleh kosong'
          }}
          render={({ field }) => (
            <Select
              isRequired
              size="sm"
              label="Tahun"
              className="col-span-1"
              color={form.formState.errors?.payment_year ? "danger" : "default"}
              description={form.formState.errors?.payment_year ? form.formState.errors?.payment_year.message : ""}
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
          control={form.control}
          name="payment_month"
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
              size="sm"
              selectionMode="multiple"
              label="Bulan"
              className="col-span-1"
              color={form.formState.errors?.payment_month ? "danger" : "default"}
              description={form.formState.errors?.payment_month ? form.formState.errors?.payment_month.message : ""}
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
        />

        <div className="col-span-2 space-y-2 mt-4">
          <p className="text-md font-bold ">Pilih Iuran</p>
          <Controller
            name="iuran"
            control={form.control}
            rules={{
              validate: (value) => {
                if (!value?.filter(i => i.checked).length) {
                  return 'Pilih minimal satu iuran';
                }
                return true;
              }
            }}
            render={() => (
              <>
                {form.watch('iuran')?.length > 0 && (
                  <>
                    {iuranOptions?.map((iuran, index) => (
                      <PaymentItem
                        key={iuran.id}
                        data={iuran}
                        index={index}
                        {...form}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          />
          {form.formState.errors?.iuran && (
            <span className="text-danger-500 text-sm">{form.formState.errors?.iuran?.message}</span>
          )}
        </div>
      </div>

      <Spacer y={20} />

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-foreground-50 border-t grid grid-cols-2 z-10">
        <div className="flex flex-col gap-0">
          <span className="text-sm text-zinc-500">Total Pembayaran</span>
          <span className="text-xl font-semibold text-warning-600">
            {form.watch('iuran')?.filter(i => i.checked).reduce((acc, curr) => {
              return acc + Number(curr.amount) * form.watch('payment_month').length;
            }, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) || ''}
          </span>
        </div>
        <Button
          type="submit"
          color="secondary"
          size="lg"
        >
          Simpan
        </Button>
      </div>
    </form>
  )
}

export default PembayaranForm;
