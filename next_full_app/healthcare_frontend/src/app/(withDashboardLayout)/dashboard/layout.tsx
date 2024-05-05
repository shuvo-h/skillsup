import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer.tsx";

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <DashboardDrawer>{children}</DashboardDrawer>
  );
};

export default DashboardLayout;