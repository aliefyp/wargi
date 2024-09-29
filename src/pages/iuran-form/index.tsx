import useGetIuranById from "@/api/iuran/useGetIuranById";
import useInsertIuran from "@/api/iuran/useInsertIuran";
import useUpdateIuran from "@/api/iuran/useUpdateIuran";
import ConfirmationModal from "@/components/confirmation-modal";
import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import IuranForm from "./components/form";
import { IuranFormType } from "./types";

const IuranFormPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = Boolean(params.iuran_id);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [iuranData, setIuranData] = useState<IuranFormType | null>(null);
  const [defaultValues, setDefaultValues] = useState<IuranFormType | null>(null);
  const insertIuran = useInsertIuran();
  const editIuran = useUpdateIuran();
  const { data } = useGetIuranById({
    iuran_id: Number(params.iuran_id),
    enabled: isEdit,
  });

  useEffect(() => {
    if (isEdit && data && !defaultValues) {
      setDefaultValues(data.data.attributes);
    }
  }, [data, defaultValues]);

  const handleSubmitClick = (data: IuranFormType) => {
    setShowConfirmation(true);
    setIuranData(data);
  }

  const handleConfirmSubmit = () => {
    if (iuranData) {
      if (isEdit) {
        editIuran.mutateAsync({ id: Number(params.iuran_id), data: iuranData })
          .then(res => {
            if (res.data?.id) {
              toast('Perubahan berhasil disimpan', { type: 'success' });
              navigate('/iuran');
            } else {
              throw new Error(res?.error?.message)
            }
          })
          .catch((error) => {
            const message = error instanceof Error ? error.message : 'Terjadi kesalahan';

            console.log(message);
            toast(message, { type: 'error' });
          })
        return;
      } else {
        insertIuran.mutateAsync({ data: iuranData })
          .then(res => {
            if (res.data?.id) {
              toast('Iuran berhasil disimpan', { type: 'success' });
              navigate('/iuran');
            } else {
              throw new Error(res?.error?.message)
            }
          })
          .catch((error) => {
            const message = error instanceof Error ? error.message : 'Terjadi kesalahan';

            console.log(message);
            toast(message, { type: 'error' });
          })
      }
    }
  }

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  }

  return (
    <div className="space-y-4">
      <section>
        <p className={title({ size: 'sm' })}>{isEdit ? 'Ubah Data Iuran' : 'Iuran Baru'}</p>
      </section>

      {((isEdit && defaultValues) || !isEdit) && (
        <IuranForm defaultValues={defaultValues} onSubmit={handleSubmitClick} />
      )}

      <ConfirmationModal
        isOpen={showConfirmation}
        title={isEdit ? 'Simpan Perubahan' : 'Simpan Iuran'}
        message={`Apakah Anda yakin ingin menyimpan iuran ${iuranData?.iuran_name} sebesar ${iuranData?.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}?`}
        primaryAction={handleConfirmSubmit}
        secondaryAction={handleCancelSubmit}
        primaryText="Simpan"
        secondaryText="Cek Lagi"
        onChange={() => setShowConfirmation(false)}
      />
    </div>
  )
}

export default IuranFormPage;