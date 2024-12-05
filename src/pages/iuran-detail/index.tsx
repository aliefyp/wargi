import useGetIuranById from "@/api/iuran/useGetIuranById";
import useGetAllTransaction from "@/api/transaction/useGetAllTransaction";
import useGetAllUnit from "@/api/unit/useGetAllUnit";
import { subtitle, title } from "@/components/primitives";
import { IURAN_TYPE } from "@/constants/iuran";
import { USER_UNIT } from "@/constants/local-storage-keys";
import { Button } from "@nextui-org/button";
import { Card, Chip, Divider, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { HiOutlineCash, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";


const IuranDetail = () => {
  const navigate = useNavigate();
  const params = useParams() as { iuran_id: string };

  const [selectedUnit, setSelectedUnit] = useState([localStorage.getItem(USER_UNIT) || '0']);
  const [selectedMonth, setSelectedMonth] = useState([dayjs().format('M')]);
  const [selectedYear, setSelectedYear] = useState([dayjs().format('YYYY')]);

  const { data: dataIuran } = useGetIuranById({ iuran_id: Number(params.iuran_id) });
  const iuran = dataIuran?.data;

  const { data: dataUnit } = useGetAllUnit();
  const unitList = dataUnit?.data;

  const iuranFilter = `filters[iuran][$eq]=${params.iuran_id}`;
  const unitFilter = selectedUnit[0] === '0' ? '' : `&filters[unit][$eq]=${selectedUnit}`;
  const monthFilter = selectedMonth[0] === '0' ? '' : `&filters[payment_month][$eq]=${selectedMonth}`;
  const yearFilter = selectedYear[0] === '0' ? '' : `&filters[payment_year][$eq]=${selectedYear}`;
  const transactionFilter = `${iuranFilter}${unitFilter}${monthFilter}${yearFilter}`;
  const { data: dataTransaction } = useGetAllTransaction(transactionFilter);
  const transactionList = dataTransaction?.data;
  const transactionMeta = dataTransaction?.meta;
  const transactionHasMultiplePage = (transactionMeta?.pagination?.pageCount || 0) > 1;

  const handleEditClick = () => {
    navigate(`/iuran/edit/${params.iuran_id}`);
  }

  const unitOptions = [
    { key: 0, label: 'Semua Unit' },
    ...(unitList?.map(unit => ({
      key: String(unit.id),
      label: unit.attributes.unit_name,
    })) ?? [])
  ];

  const monthOptions = [
    { key: '0', label: 'Semua Bulan' },
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

  const currentYear = dayjs().year();

  const yearOptions = [
    { key: '0', label: 'Semua Tahun' },
    { key: String(currentYear - 3), label: String(currentYear - 3) },
    { key: String(currentYear - 2), label: String(currentYear - 2) },
    { key: String(currentYear - 1), label: String(currentYear - 1) },
    { key: String(currentYear), label: String(currentYear) },
  ]

  const getChipColorByStatus = (status: string) => {
    switch (status) {
      case 'billed':
        return 'default';
      case 'pending':
        return 'warning';
      case 'verified':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'default';
    }
  }

  const getChipTextByStatus = (status: string) => {
    switch (status) {
      case 'billed':
        return 'Tagihan';
      case 'pending':
        return 'Menunggu Verifikasi';
      case 'verified':
        return 'Sudah Diverifikasi';
      case 'rejected':
        return 'Ditolak';
      default:
        return 'Tagihan';
    }
  }

  useEffect(() => {
    if (iuran) {
      const isBeforeRecurrenceDate = dayjs().date() < iuran.attributes.recurrence_date;
      const lastMonth = dayjs().subtract(1, 'month').format('M');
      const currentMonth = dayjs().format('M');

      const month = isBeforeRecurrenceDate ? lastMonth : currentMonth;
      setSelectedMonth([month]);
    }
  }, [iuran])

  return (
    <div className="space-y-6">
      <section>
        <div className="flex justify-between items-center">
          <p className={title({ size: 'sm' })}>{iuran?.attributes.iuran_name}</p>
          <Button isIconOnly variant="flat" onClick={handleEditClick}>
            <HiOutlinePencil />
          </Button>
        </div>
      </section>

      <section>
        <Card shadow="none" className="bg-content2 py-4 px-2">
          <div className="space-y-2">
            <div className="flex flex-row items-center justify-between">
              <Chip color={iuran?.attributes.is_mandatory ? "success" : "default"} size="sm">
                {iuran?.attributes.is_mandatory ? 'Iuran Wajib' : 'Iuran Sukarela'}
              </Chip>
              <span className={`${title({ size: 'sm' })} text-warning-600`}>
                {iuran?.attributes?.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) || ''}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500">Pembayaran</span>
                <span>{IURAN_TYPE[iuran?.attributes?.iuran_type || 'once']}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500">Tanggal Pembayaran</span>
                <span>Tanggal {iuran?.attributes?.recurrence_date || 1}</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <div className="space-y-4 sticky top-0">
          <div className={subtitle()}>Riwayat Pembayaran</div>
          <div className="grid grid-cols-2 gap-2">
            {dataUnit?.data.length && (
              <Select
                name="unit"
                size="sm"
                label="Plih Unit"
                className="col-span-2"
                selectedKeys={selectedUnit}
                onChange={(e) => {
                  setSelectedUnit([e.target.value]);
                  localStorage.setItem(unitKey, e.target.value);
                }}
              >
                {(unitOptions || []).map(option => (
                  <SelectItem key={option.key}>{option.label || ''}</SelectItem>
                ))}
              </Select>
            )}
            <Select
              name="month"
              size="sm"
              label="Plih Bulan"
              selectedKeys={selectedMonth}
              onChange={e => setSelectedMonth([e.target.value])}
            >
              {monthOptions.map(option => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
            <Select
              name="year"
              size="sm"
              label="Plih Tahun"
              selectedKeys={selectedYear}
              onChange={(e) => {
                setSelectedYear([e.target.value])
              }}
            >
              {yearOptions.map(option => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
          <Divider />
          <Table isStriped removeWrapper aria-label="Riwayat Pembayaran" >
            <TableHeader>
              <TableColumn align="center">UNIT</TableColumn>
              <TableColumn align="center">BULAN</TableColumn>
              <TableColumn align="center">STATUS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>
              {(transactionList || [])?.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell align="center">{transaction.attributes.unit?.data.attributes.unit_name || ''}</TableCell>
                  <TableCell align="center">{`${transaction.attributes.payment_month}/${transaction.attributes.payment_year}` || ''}</TableCell>
                  <TableCell align="center">
                    <Chip color={getChipColorByStatus(transaction.attributes.status || '')} size="sm">
                      {getChipTextByStatus(transaction.attributes.status || '')}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {transactionHasMultiplePage && (
            <Pagination total={(transactionMeta?.pagination?.pageCount || 0)} initialPage={1} />
          )}
        </div>
      </section>

      <section className="sticky bottom-0 py-2 bg-content1">
        <div className="space-y-2">
          <Button
            fullWidth
            variant="solid"
            color="secondary"
            onClick={() => { }}
            className="col-span-2"
            startContent={<HiOutlineCash size={20} />}
          >
            Bayar
          </Button>
          <Button
            fullWidth
            variant="light"
            color="danger"
            onClick={() => { }}
            startContent={<HiOutlineTrash size={20} />}
          >
            Hapus
          </Button>
        </div>
      </section>
    </div>
  )
}

export default IuranDetail;
