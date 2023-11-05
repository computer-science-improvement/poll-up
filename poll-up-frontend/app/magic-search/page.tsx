'use client';
import MagicSearch from '@/components/magic-search';
import UserCard from '@/components/user-card';
import DonutChart from '@/components/donut-chart';
import { MagicSearchService } from '@/services/magic-search';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

type MagicSearchPageProps = {
  params: Record<string, string>;
  searchParams: {
    prompt?: string;
  };
};

export default function MagicSearchPage({
  searchParams: { prompt },
}: MagicSearchPageProps) {
  const query = useQuery({
    queryKey: ['question', prompt],
    queryFn: () => MagicSearchService.search(String(prompt)),
    enabled: !!prompt,
  });

  console.log(query.data?.data?.data?.users);

  return (
    <div className='mx-auto max-w-5xl px-6 py-12 flex lg:px-8'>
      {/*<MagicSearch />*/}
      <UserCard />
      {/*<DonutChart />*/}
    </div>
  );
}
