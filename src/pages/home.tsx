

import { title } from "@/components/primitives";
import { Button, Card, CardBody } from "@nextui-org/react";
import { HiOutlineArrowRight, HiOutlineLocationMarker } from "react-icons/hi";
import { PiClock, PiMoney, PiSpeakerHigh, PiUsers } from "react-icons/pi";
import { useNavigate } from "react-router-dom";


const THUMBNAIL_MENUS = [
  { id: "iuran", title: "Iuran", icon: PiUsers, color: "bg-secondary-500", href: "/iuran" },
  { id: "pembayaran", title: "Bayar", icon: PiMoney, color: "bg-secondary-500", href: "/pembayaran" },
  { id: "riwayat", title: "Riwayat", icon: PiClock, color: "bg-secondary-500", href: "/riwayat" },
  { id: "pengumuman", title: "Pengumuman", icon: PiSpeakerHigh, color: "bg-secondary-500", href: "/pengumuman" },
]

export default function HomePage() {
  const navigate = useNavigate();

  const handleMenuClick = (url: string) => {
    navigate(url)
  }

  const handleResidenceClick = () => {
    navigate('/residence-profile');
  }

  return (
    <div className="space-y-6">
      <section>
        <div className="flex justify-between items-center cursor-pointer group" onClick={handleResidenceClick}>
          <div>
            <h1 className={`${title({ size: 'sm' })}`}>Santika Land</h1>
            <div className="flex items-center gap-1 ">
              <HiOutlineLocationMarker size={16} className="text-gray-600" />
              <p className="text-sm text-zinc-600 font-bold group-hover:underline">Baki, Sukoharjo</p>
            </div>
          </div>
          <Button variant="light" isIconOnly>
            <HiOutlineArrowRight size={24} className="group-hover:scale-105" />
          </Button>
        </div>
      </section>

      {/* <section>
        <Card shadow="none" className="bg-warning-100 border-2 border-warning-500">
          <CardBody className=" flex gap-2 flex-row">
            <PiWarning size={24} className="shrink-0 mt-2 text-warning-700" />
            <div>
              <p className="font-bold text-lg">Pengumuman</p>
              <p>Jalan ke arah barat ditutup untuk acara warga. Silahkan gunakan jalan ke arah timur.</p>
            </div>
          </CardBody>
        </Card>
      </section> */}

      <section className="grid grid-cols-2 gap-4">
        {THUMBNAIL_MENUS.map(menu => {
          return (
            <Card
              key={menu.id}
              isPressable
              shadow="none"
              className="hover:scale-105"
              onPress={() => handleMenuClick(menu.href)}
            >
              <CardBody className="bg-content2 w-full h-[120px] space-y-4">
                <div className={`flex items-center justify-center rounded-lg w-[48px] h-[48px] bg-content3`}>
                  <menu.icon className="text-secondary-500" size={24} />
                </div>
                <p className="text-xl font-bold">{menu.title}</p>
              </CardBody>
            </Card>
          )
        })}
      </section>
    </div>
  );
}
