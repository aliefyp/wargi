

import { Card, CardBody } from "@nextui-org/react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiMoney, PiWarning } from "react-icons/pi";
import { useNavigate } from "react-router-dom";


const THUMBNAIL_MENUS = [
  { id: "payment", title: "Iuran", icon: PiMoney, color: "bg-content3", href: "/payments" },
  { id: "information", title: "Informasi", icon: PiWarning, color: "bg-content3", href: "/information" },
]

export default function HomePage() {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(url)
  }

  return (
    <div className="space-y-6">
      <section>
        <Card shadow="none" className="bg-primary-500">
          <CardBody className="text-white">
            <h1 className="text-xl font-bold">Santika Land</h1>
            <div className="flex items-center gap-1">
              <HiOutlineLocationMarker size={16} />
              <p className="text-sm">Baki, Sukoharjo</p>
            </div>
          </CardBody>
        </Card>
      </section>
      <section className="grid grid-cols-2 gap-4">
        {THUMBNAIL_MENUS.map(menu => {
          const bgClass = `bg-${menu.color}-500`;
          return (
            <Card
              key={menu.id}
              isPressable
              shadow="none"
              className="hover:scale-105"
              onPress={() => handleClick(menu.href)}
            >
              <CardBody className="bg-content2 w-full h-[120px] space-y-4">
                <div className={`flex items-center justify-center rounded-lg w-[48px] h-[48px] ${menu.color}`}>
                  <menu.icon size={24} />
                </div>
                <p className="text-xl font-bold">{menu.title}</p>
              </CardBody>
              {/* <CardFooter className="p-1">
              <span className="text-sm font-bold text-center w-full">{menu.title}</span>
            </CardFooter> */}
            </Card>
          )
        })}
      </section>
    </div>
  );
}
