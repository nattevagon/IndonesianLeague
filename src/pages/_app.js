import MainLayout from "@/components/layouts/MainLayout";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useRouter } from "next/router";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAdmin= router.pathname.startsWith("/admin");

  const getLayout =
    Component.getLayout ||
    ((page) =>
      isAdmin? (
        <AdminLayout>{page}</AdminLayout>
      ) : (
        <MainLayout>{page}</MainLayout>
      ));

  return getLayout(<Component {...pageProps} />);
}
