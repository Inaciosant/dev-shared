"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SetupsListView } from "@/components/setup/SetupsListView";
import { filterSetupsByQuery, mockSetups } from "@/mocks/setups";

export default function SetupsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, [query]);

  const filteredSetups = filterSetupsByQuery(mockSetups, query);

  return (
    <SetupsListView
      title="Explorar Setups"
      subtitle="Busque por stack, cargo ou tags usando a navbar."
      setups={filteredSetups}
      isLoading={isLoading}
      query={query}
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Setups" },
      ]}
    />
  );
}
