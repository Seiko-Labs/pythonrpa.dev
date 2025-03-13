"use client";

import type { FC, PropsWithChildren } from "react";
import { AppSidebar } from "./sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/primitives/sidebar";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-muted relative">{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
