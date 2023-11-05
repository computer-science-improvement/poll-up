import MagicSearch from '@/components/magic-search';
import UserCard from '@/components/user-card';
import DonutChart from '@/components/donut-chart';

type MagicSearchPageProps = {
  params: Record<string, string>;
  searchParams: {
    prompt?: string;
  };
};

export default function MagicSearchPage({
  searchParams: { prompt },
}: MagicSearchPageProps) {
  console.log(prompt);
  return (
    <div className='mx-auto max-w-5xl px-6 py-12 flex lg:px-8'>
      {/*<MagicSearch />*/}
      <UserCard />
      <DonutChart />
    </div>
  );
}
