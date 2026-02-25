import type { Metadata } from "next";

import StyledComponentsRegistry from "../lib/registry"; 
import ThemeClientProvider from "../components/ThemeClientProvider";
import { AppShell } from "../components/layout/AppShell";

export const metadata: Metadata = {
  title: "Dev-Stack-Share",
  description: "Compartilhe seu setup com a comunidade dev.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <ThemeClientProvider>
            <AppShell>{children}</AppShell>
          </ThemeClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
