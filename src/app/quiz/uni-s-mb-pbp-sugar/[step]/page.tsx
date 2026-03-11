import { redirect } from "next/navigation";
import { getQuizPathForStep, QUIZ_BASE_PATH } from "@/data/funnelRoutes";

interface PageProps {
  params: Promise<{ step: string }>;
}

export default async function FunnelStepRoute({ params }: PageProps) {
  const { step } = await params;
  const stepId = Number.parseInt(step, 10);

  if (Number.isNaN(stepId)) {
    redirect(QUIZ_BASE_PATH);
  }

  redirect(getQuizPathForStep(stepId));
}
