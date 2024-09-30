import { Response } from "@/api/iuran/useGetAllIuran/types"
import { IURAN_TYPE } from "@/constants/iuran"
import { Card, Chip } from "@nextui-org/react"

interface Props {
  iuran: Response['data'][0]
  onClick: () => void
}

const IuranCard = ({ iuran, onClick }: Props) => {
  return (
    <Card shadow="none" isPressable fullWidth key={iuran.id} className="px-2 py-3 bg-content2 text-left" onPress={onClick}>
      <div className="flex justify-between items-center w-full">
        <div className="space-y-1">
          <p className="text-md font-semibold">
            {iuran.attributes.iuran_name || ''}
          </p>
          <p className="text-sm text-zinc-500">
            {`${IURAN_TYPE[iuran.attributes.iuran_type || 'once']} - setiap tanggal ${iuran.attributes.recurrence_date || 1}`}
          </p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <Chip color={iuran.attributes.is_mandatory ? "success" : "default"} size="sm">
            {iuran.attributes.is_mandatory ? 'Wajib' : 'Sukarela'}
          </Chip>
          <p className="text-md font-semibold text-warning-600">
            {iuran.attributes.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) || ''}
          </p>
        </div>
      </div>
    </Card >
  )
}

export default IuranCard;