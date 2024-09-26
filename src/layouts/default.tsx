import { Link } from "@nextui-org/link";

import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="bg-background min-w-[100vw] min-h-[100vh]">
      <div className="relative flex flex-col h-screen max-w-[500px] min-w-[360px] m-auto bg-content1">
        <Navbar />
        <main className="container mx-auto max-w-7xl p-6 flex-grow">
          <Outlet />
        </main>
        <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
            title="nextui.org homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">NextUI</p>
          </Link>
        </footer>
      </div>
    </div>
  );
}
