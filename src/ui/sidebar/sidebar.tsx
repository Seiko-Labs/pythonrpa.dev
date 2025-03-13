"use client";

import * as React from "react";
import { SidebarContent, Sidebar } from "@/shared/primitives/sidebar";

import DashboardIcon from "@/shared/icons/dashboard.svg";
import PythonIcon from "@/shared/icons/python.svg";
import CodeIcon from "@/shared/icons/code.svg";
import BotIcon from "@/shared/icons/bot.svg";
import HexagonIcon from "@/shared/icons/hexagon.svg";
import BooksIcon from "@/shared/icons/books.svg";

import { NavHeader } from "./nav-header";
import { NavMain } from "./nav-main";
import { NavFooter } from "./nav-footer";

const data = [
  {
    name: "Home",
    url: "/",
    icon: DashboardIcon,
  },
  {
    name: "Python Automation",
    url: "/py",
    icon: PythonIcon,
  },
  {
    name: "Low-code Automation",
    url: "/lc",
    icon: CodeIcon,
  },
  {
    name: "Agent (Bot Runner)",
    url: "/bot",
    icon: BotIcon,
  },
  {
    name: "Orchestrator",
    url: "/orc",
    icon: HexagonIcon,
  },
];

const mdx = {
  name: "Knowledge center",
  icon: BooksIcon,
  items: [
    {
      title: "Online academy",
      url: "/academy",
    },
    {
      title: "Discord Community and Forum",
      url: "/community",
    },
    {
      title: "Documentation",
      url: "/docs",
    },
    {
      title: "Use cases",
      url: "/use-cases",
    },
    {
      title: "Requirements",
      url: "/requirements",
    },
    {
      title: "Security",
      url: "/security",
    },
    {
      title: "Alternative tools",
      url: "/alternatives",
    },
    {
      title: "Roadmap",
      url: "/roadmap",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavHeader />
        <NavMain data={data} mdx={mdx} />
      </SidebarContent>
      <NavFooter />
    </Sidebar>
  );
}
