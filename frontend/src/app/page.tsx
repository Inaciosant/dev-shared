import { SetupsListView } from "@/components/setup/SetupsListView";
import { setupService } from "@/services/setup/setup.service";
import { ISetup } from "@/types/setup";

interface HomeProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
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
      title="Setups em destaque"
      subtitle="Explore configurações compartilhadas pela comunidade."
      setups={setups}
      query={query}
      errorMessage={errorMessage}
    />
  );
}
