import { title } from "@/components/primitives";
import PembayaranForm from "./components/form";

const PembayaranPage = () => {
  return (
    <div className="space-y-6">
      <section>
        <div className="flex justify-between items-center">
          <p className={title({ size: 'sm' })}>Pembayaran</p>
        </div>
      </section>

      <section>
        <PembayaranForm />
      </section>
    </div>
  )
}

export default PembayaranPage;