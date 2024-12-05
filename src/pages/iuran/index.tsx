import useGetAllIuran from "@/api/iuran/useGetAllIuran";
import IuranCard from "@/components/iuran-card";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Pagination, Skeleton } from "@nextui-org/react";
import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";


export default function PaymentPage() {
  const navigate = useNavigate();

  const { data, isFetching } = useGetAllIuran();

  const hasMultiplePage = (data?.meta?.pagination?.pageCount || 0) > 1;

  const handleItemClick = (id: number) => {
    navigate(`/iuran/${id}`);
  }

  const handleAddNewClick = () => {
    navigate('/iuran/new');
  }

  return (
    <>
      <div className="space-y-4">
        <section>
          <div className="flex justify-between items-center">
            <p className={title({ size: 'sm' })}>Iuran</p>
            <Button isIconOnly variant="flat" onClick={handleAddNewClick}>
              <HiOutlinePlus />
            </Button>
          </div>
        </section>

        <section>
          <div className="space-y-2">
            {isFetching && (
              <>
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-[72px] rounded-xl bg-content2" />
                ))}
              </>
            )}
            {!isFetching && data?.data?.map((iuran) => (
              <IuranCard
                key={iuran.id}
                iuran={iuran}
                onClick={() => handleItemClick(iuran.id)}
              />
            ))}
          </div>
        </section>

        {hasMultiplePage && (
          <section>
            <Pagination total={(data?.meta?.pagination?.pageCount || 0)} initialPage={1} />
          </section>
        )}
      </div>
    </>
  );
}
