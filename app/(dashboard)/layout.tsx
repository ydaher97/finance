import { Header } from "@/components/header";

type props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: props) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:x-14">{children}</main>
    </>
  );
};

export default DashboardLayout;
