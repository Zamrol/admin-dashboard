import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableAkun from "@/components/Tables/TableAkun";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Akun = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tabel User" />

      <div className="flex flex-col gap-10">
        <TableAkun />
      </div>
    </DefaultLayout>
  );
};

export default Akun;