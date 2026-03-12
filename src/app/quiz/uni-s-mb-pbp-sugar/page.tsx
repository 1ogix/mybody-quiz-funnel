import FunnelStepPage from "@/components/quiz/FunnelStepPage";
import {
  DEFAULT_FUNNEL_QUESTION,
  getStepIdFromQuestion,
} from "@/data/funnelRoutes";

interface PageProps {
  searchParams?: Promise<{ question?: string }>;
}

export default async function FunnelEntryPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : undefined;
  const stepId = getStepIdFromQuestion(params?.question);
  const activeQuestionKey = params?.question ?? DEFAULT_FUNNEL_QUESTION;

  return <FunnelStepPage stepId={stepId} activeQuestionKey={activeQuestionKey} />;
}
