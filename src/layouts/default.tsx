
import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="bg-background min-w-screen min-h-screen">
      <div className="relative flex flex-col max-w-[500px] min-w-[360px] m-auto bg-content1 min-h-[inherit]">
        <Navbar />
        <main className="container mx-auto max-w-7xl p-6 grow">
          <Outlet />
        </main>
        {/* <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
            title="nextui.org homepage"
          >
            <span className="text-default-600 text-xs">Created by</span>
            <p className="text-secondary text-xs">Banyugeni Studio</p>
          </Link>
        </footer> */}
      </div>
    </div>
  );
}
