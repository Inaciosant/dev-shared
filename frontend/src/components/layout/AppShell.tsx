"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Navbar } from "./Navbar";
import Footer from "./Footer";

type AppShellProps = {
  children: ReactNode;
};

const HIDE_NAVBAR_ROUTES = new Set(["/login", "/register"]);

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const shouldHideNavbar = pathname
    ? HIDE_NAVBAR_ROUTES.has(pathname)
    : false;

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
      <Footer />
    </>
  );
}
