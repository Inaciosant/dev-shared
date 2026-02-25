"use client";

import React, { useState, useSyncExternalStore, createContext } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/themes";
import { GlobalStyles } from "@/styles/GlobalStyles";

export const ThemeToggleContext = createContext({
  toggleTheme: () => {},
  isDark: true,
});

const subscribe = () => () => {};

export default function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;

    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "dark") return true;
    if (storedTheme === "light") return false;

    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      window.localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  if (!mounted) return null;

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme, isDark }}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}
