// layout.tsx
"use client";

import { useSidebar } from "@/context/SidebarContext";
import { HeaderVisibilityProvider, useHeaderVisibility } from "@/context/HeaderVisibilityContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { showHeader } = useHeaderVisibility();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />
      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        {showHeader && <AppHeader />}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeaderVisibilityProvider>
      <LayoutContent children={children} />
    </HeaderVisibilityProvider>
  );
}
