"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/shared/primitives/sidebar";
import { ChevronDown } from "lucide-react";
import { JoinedBulletList } from "./components/JoinedBulletlist";
import { useState, type FC, type SVGProps } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/primitives/collapsible";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavMainProps {
  data: {
    name: string;
    url: string;
    icon: FC<SVGProps<SVGSVGElement>> | React.ComponentType<object>;
  }[];

  mdx: {
    name: string;
    icon: FC<SVGProps<SVGSVGElement>> | React.ComponentType<object>;
    items: {
      title: string;
      url: string;
    }[];
  };
}

export const NavMain: FC<NavMainProps> = ({ data, mdx }) => {
  const { open } = useSidebar();

  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (url: string) => {
    return pathname === url;
  };

  return (
    <SidebarGroup className="space-y-2">
      {data.map((item) => (
        <SidebarMenuButton
          className={cn(
            isActive(item.url) &&
              "bg-sidebar-accent/50 text-sidebar-accent-foreground"
          )}
          key={item.name}
          tooltip={item.name}
          asChild
        >
          <Link href={item.url}>
            {item.icon && <item.icon />}
            <span className="w-full text-nowrap overflow-hidden">
              {item.name}
            </span>
          </Link>
        </SidebarMenuButton>
      ))}

      <SidebarMenu>
        <Collapsible
          asChild
          disabled={!open}
          open={collapsibleOpen && open}
          onOpenChange={setCollapsibleOpen}
          className="group/collapsible pb-2.5 data-[state=open]:text-sidebar-primary-foreground data-[state=open]:bg-sidebar-collapsible rounded-md"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <mdx.icon />
                <span className="w-full text-nowrap overflow-hidden">
                  {mdx.name}
                </span>
                <ChevronDown className="ml-auto !size-5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 pr-2">
              <SidebarMenuSub>
                <JoinedBulletList>
                  {mdx.items.map((item) => (
                    <SidebarMenuSubItem className="w-full" key={item.title}>
                      <SidebarMenuSubButton asChild className="w-full">
                        <a href={item.url}>
                          <span className="text-nowrap overflow-hidden">
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </JoinedBulletList>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
};
