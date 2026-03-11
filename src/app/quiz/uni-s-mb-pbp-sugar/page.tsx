import FunnelStepPage from "@/components/quiz/FunnelStepPage";
import { getStepIdFromQuestion } from "@/data/funnelRoutes";

interface PageProps {
  searchParams?: Promise<{ question?: string }>;
}

export default async function FunnelEntryPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : undefined;
  const stepId = getStepIdFromQuestion(params?.question);

  return <FunnelStepPage stepId={stepId} />;
}
