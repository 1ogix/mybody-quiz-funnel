import { redirect } from "next/navigation";
import { getLoaderPath } from "@/data/funnelRoutes";

export default function LoadingScreen() {
  redirect(getLoaderPath());
}
