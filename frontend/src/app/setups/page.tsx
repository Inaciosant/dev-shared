import { SetupsListView } from "@/components/setup/SetupsListView";
import { setupService } from "@/services/setup/setup.service";
import { ISetup } from "@/types/setup";

interface SetupsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SetupsPage({ searchParams }: SetupsPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  let setups: ISetup[] = [];
  let errorMessage = "";

  try {
    setups = await setupService.list(query ? { q: query } : undefined);
  } catch {
    errorMessage = "Não foi possível carregar os setups agora. Tente novamente em instantes.";
  }

  return (
    <SetupsListView
      title="Explorar Setups"
      subtitle="Busque por stack, cargo ou tags usando a navbar."
      setups={setups}
      query={query}
      errorMessage={errorMessage}
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Setups" },
      ]}
    />
  );
}
