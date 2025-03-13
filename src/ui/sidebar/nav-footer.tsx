import { signOut } from "next-auth/react";
import { SidebarFooter, SidebarMenuButton } from "@/shared/primitives/sidebar";
import LogoutIcon from "@/shared/icons/logout.svg";
import UserIcon from "@/shared/icons/user.svg";

export const NavFooter = () => {
  return (
    <SidebarFooter className="pb-5">
      <SidebarMenuButton tooltip="User">
        <UserIcon />
        <span className="w-full text-nowrap overflow-hidden">User</span>
      </SidebarMenuButton>

      <SidebarMenuButton
        tooltip="Log out"
        className="text-destructive active:bg-destructive/90 active:text-foreground hover:bg-destructive hover:text-foreground"
        onClick={() => {
          void signOut({ callbackUrl: "/login" });
        }}
      >
        <LogoutIcon />
        <span className="w-full text-nowrap overflow-hidden">Log out</span>
      </SidebarMenuButton>
    </SidebarFooter>
  );
};
