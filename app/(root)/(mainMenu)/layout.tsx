import { Sidebar } from "@/components/ui/Sidebar";
import React from "react";

const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:bg-blueBg bg-transparent">
      <div className="container">
        <div className="flex w-full">
          <aside className="w-[25%] hidden tab:block">
            <Sidebar />
          </aside>
          <main className="mt-12 rounded-[4px] lg:ml-10 md:pl-6 pl-0 lg:w-[75%] w-full relative">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CompanyLayout;
