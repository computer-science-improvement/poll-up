'use client';
import UserCard from '@/components/user-card';
import { MagicSearchService } from '@/services/magic-search';
import { useQuery } from '@tanstack/react-query';
import { Progress } from '@nextui-org/react';
import React from 'react';

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

  const users = (query.data?.data?.data?.users ?? []).filter((result: any) => {
    return !!result.percentage;
  });

  return (
    <div className='mx-auto max-w-5xl px-6 py-12 flex lg:px-8 gap-4 flex-wrap'>
      {/*<MagicSearch />*/}
      {query.isLoading ? (
        <Progress
          size='sm'
          isIndeterminate
          aria-label='Loading...'
          className='max-w-[100%]'
        />
      ) : (
        <>
          {!!users.length ? (
            <>
              {users.map((user: any) => {
                return (
                  <UserCard
                    id={user.id}
                    key={user.id}
                    name={user.name}
                    reason={user.reason}
                  />
                );
              })}
            </>
          ) : (
            <div>No Data</div>
          )}
        </>
      )}
      {/*<DonutChart />*/}
    </div>
  );
}
