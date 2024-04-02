import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: any) => {
  return (
    <>
        <Sidebar children={children} />
        
    </>
  );
};

export default DashboardLayout;
