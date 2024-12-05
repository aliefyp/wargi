import { title } from "@/components/primitives";
import { IURAN_TYPE } from "@/constants/iuran";
import { Button, Card, Modal, ModalBody, ModalContent, ModalHeader, UseDisclosureProps } from "@nextui-org/react";
import { HiOutlineCash, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { IuranItem } from "../types";

interface Props extends UseDisclosureProps {
  iuran: IuranItem | null
  onEditClick: () => void
}

const PaymentDetailModal = ({ iuran, isOpen, onChange, onEditClick }: Props) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onOpenChange={onChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{iuran?.attributes?.iuran_name}</ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                <Card shadow="none" className="bg-content2 p-2 text-center">
                  <span className={`${title({ size: 'sm' })} text-warning-600`}>
                    {iuran?.attributes?.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) || ''}
                  </span>
                </Card>

                {iuran?.attributes?.description && (
                  <section>
                    <p className="text-sm">{iuran?.attributes?.description}</p>
                  </section>
                )}

                <section>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-zinc-500">Tipe Pembayaran</span>
                      <span>{IURAN_TYPE[iuran?.attributes?.iuran_type || 'once']}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-zinc-500">Tanggal Pembayaran</span>
                      <span>Tanggal {iuran?.attributes?.recurrence_date || 1}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-zinc-500">Iuran Wajib</span>
                      <span>{iuran?.attributes?.is_mandatory ? 'Ya' : 'Tidak'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-zinc-500">Informasi Pembayaran</span>
                      <span className="text-secondary-500 font-bold" onClick={() => navigate('/residence-profile')}>Klik di sini</span>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      fullWidth
                      variant="solid"
                      color="secondary"
                      onClick={onClose}
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
                    <Button
                      fullWidth
                      variant="light"
                      color="default"
                      onClick={onEditClick}
                      startContent={<HiOutlinePencil size={20} />}
                    >
                      Ubah
                    </Button>
                  </div>
                </section>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default PaymentDetailModal;