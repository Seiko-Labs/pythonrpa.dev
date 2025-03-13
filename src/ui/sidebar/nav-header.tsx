"use client";

import {
  SidebarGroup,
  SidebarTrigger,
  useSidebar,
} from "@/shared/primitives/sidebar";
import { ThemeSwitch } from "./components/ThemeSwitch";

import LogoDarkIcon from "@/shared/icons/logo-dark.svg";

export const NavHeader = () => {
  const sidebar = useSidebar();

  return (
    <SidebarGroup className="border-b flex gap-2.5 h-[70px] flex-row items-center border-b-sidebar-accent">
      {sidebar.open && !sidebar.isMobile && (
        <>
          <LogoDarkIcon className="shrink-0" />
          <ThemeSwitch className="ml-auto" />
        </>
      )}

      <SidebarTrigger />
    </SidebarGroup>
  );
};
