"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SetupsListView } from "@/components/setup/SetupsListView";
import { filterSetupsByQuery, mockSetups } from "@/mocks/setups";

export default function Home() {
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
      title="Setups da comunidade"
      subtitle="Explore setups reais e filtre pela busca da navbar."
      setups={filteredSetups}
      isLoading={isLoading}
      query={query}
    />
  );
}
