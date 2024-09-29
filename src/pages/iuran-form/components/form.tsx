import { IURAN_TYPE } from "@/constants/iuran";
import { Input, Textarea } from "@nextui-org/input";
import { Button, cn, DatePicker, Radio, RadioGroup, RadioProps, Select, SelectItem } from "@nextui-org/react";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from 'react-number-format';
import { MONTH_OPTIONS } from "../constants";
import { IuranFormType } from "../types";

interface Props {
  defaultValues: IuranFormType | null;
  onSubmit: (data: IuranFormType) => void
}
export const CustomRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "m-0 bg-content1 hover:bg-content2 items-center justify-between grow max-w-full",
          "flex-row-reverse cursor-pointer rounded-lg gap-4 p-2 border-2 border-zinc-200",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const IuranForm = ({ defaultValues, onSubmit }: Props) => {
  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IuranFormType>({
    defaultValues: defaultValues || {
      is_mandatory: true,
      iuran_type: 'once',
      recurrence_date: dayjs().date(),
      recurrence_month: dayjs().month() + 1,
    }
  });

  const submitForm = (data: IuranFormType) => {
    onSubmit(data);
  }

  return (
    <form noValidate onSubmit={handleSubmit(submitForm)}>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="is_mandatory"
          render={({ field }) => (
            <RadioGroup
              {...field}
              orientation="horizontal"
              className="col-span-2 w-full"
              value={field.value ? 'mandatory' : 'optional'}
              onChange={(event) => {
                field.onChange(event.target.value === 'mandatory');
              }}
            >
              <CustomRadio value="mandatory">Iuran Wajib</CustomRadio>
              <CustomRadio value="optional">Iuran Sukarela</CustomRadio>
            </RadioGroup>
          )}
        />

        <Input
          required
          label="Nama Iuran"
          placeholder="Masukkan nama iuran"
          color={errors.iuran_name ? "danger" : "default"}
          description={errors.iuran_name ? errors.iuran_name.message : ""}
          className="col-span-2"
          {...register("iuran_name", {
            required: "Nama iuran tidak boleh kosong"
          })}
        />

        <Controller
          name="amount"
          control={control}
          rules={{
            required: "Jumlah iuran tidak boleh kosong",
            min: {
              value: 1000,
              message: "Jumlah iuran minimal Rp1000"
            }
          }}
          render={({ field }) => (
            <NumericFormat
              thousandSeparator=","
              required
              label="Jumlah Iuran"
              placeholder="0"
              className="col-span-2"
              color={errors.amount ? "danger" : "default"}
              description={errors.amount ? errors.amount.message : ""}
              startContent={<span className="text-gray-600">Rp</span>}
              customInput={Input}
              defaultValue={field.value}
              onValueChange={(values) => {
                field.onChange(values.floatValue);
              }}
            />
          )}
        />

        <Textarea
          label="Deskripsi"
          placeholder="Tuliskan deskripsi seperti tujuan iuran, pertanggungjawaban, dll"
          color={errors.description ? "danger" : "default"}
          description={errors.description ? errors.description.message : ""}
          className="col-span-2"
          {...register("description", {

          })}
        />

        <Select
          label="Jenis Pembayaran"
          className="col-span-2"
          {...register('iuran_type')}
        >
          {Object.keys(IURAN_TYPE).map((iuran) => (
            <SelectItem key={iuran}>
              {IURAN_TYPE[iuran as 'yearly' | 'monthly' | 'once']}
            </SelectItem>
          ))}
        </Select>

        {watch('iuran_type') === 'once' && (
          <DatePicker
            label="Tanggal Jatuh Tempo"
            color={errors.due_date ? "danger" : "default"}
            description={errors.due_date ? errors.due_date.message : ""}
            onChange={(value) => {
              setValue("due_date", value.toString());
            }}
          />
        )}

        {watch('iuran_type') === 'monthly' && (
          <Input
            required
            type="number"
            label="Setiap Tanggal"
            color={errors.recurrence_date ? "danger" : "default"}
            description={errors.recurrence_date ? errors.recurrence_date.message : ""}
            {...register("recurrence_date")}
          />
        )}

        {watch('iuran_type') === 'yearly' && (
          <>
            <Input
              required
              type="number"
              label="Setiap Tanggal"
              color={errors.recurrence_date ? "danger" : "default"}
              description={errors.recurrence_date ? errors.recurrence_date.message : ""}
              {...register("recurrence_date")}
            />
            <Select
              label="Pada Bulan"
              {...register('recurrence_month')}
            >
              {MONTH_OPTIONS.map((month) => (
                <SelectItem key={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </Select>
          </>
        )}
        <Button
          fullWidth
          type="submit"
          variant="solid"
          color="primary"
          className="mt-4 col-span-2"
        >
          Simpan
        </Button>
      </div>

    </form>
  );
};

export default IuranForm;