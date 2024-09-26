import { Link } from "@nextui-org/link";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen max-w-[500px] m-auto">
      <main className="px-6 py-8 grow w-full flex flex-col items-stretch justify-center">
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
  );
}
