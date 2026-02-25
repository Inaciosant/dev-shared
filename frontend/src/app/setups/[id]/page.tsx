import { notFound } from "next/navigation";

import { SetupDetailView } from "@/components/setup/SetupDetailView";
import { getSetupById } from "@/mocks/setups";

interface SetupDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function SetupDetailsPage({
  params,
}: SetupDetailsPageProps) {
  const { id } = await params;
  const setup = getSetupById(id);

  if (!setup) {
    notFound();
  }

  return <SetupDetailView setup={setup} />;
}
