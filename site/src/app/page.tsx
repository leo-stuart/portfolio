import HomeClient from '@/components/HomeClient';
import { getGitHubData } from '@/lib/github';

export const revalidate = 21600; // 6h ISR

export default async function Page() {
  const github = await getGitHubData();
  return <HomeClient github={github} />;
}
