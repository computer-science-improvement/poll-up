'use client';
import UserCard from '@/components/user-card';
import { MagicSearchService } from '@/services/magic-search';
import { useQuery } from '@tanstack/react-query';
import { Progress, Divider, Avatar } from '@nextui-org/react';
import React from 'react';
import { FactsService } from '@/services/facts';
import { random } from 'nanoid';
import { getRandom } from '@/lib/getRandom';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';

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

  const factsQuery = useQuery({
    queryKey: ['facts', prompt],
    queryFn: () => FactsService.getFacts(),
    enabled: !!prompt,
  });

  const factsData = factsQuery.data?.data ?? [];
  const factsDataLength = !!factsQuery.data?.data?.length
    ? factsQuery.data?.data?.length - 1
    : 0;
  console.log(factsData);
  const randomIndexes = [
    getRandom(0, factsDataLength),
    getRandom(0, factsDataLength),
    getRandom(0, factsDataLength),
  ];

  const users = (query.data?.data?.data?.users ?? []).filter((result: any) => {
    return !!result.percentage;
  });

  return (
    <div className='mx-auto max-w-5xl'>
      <div className='py-4'>
        <p className='px-[32px] text-[32px]'>{prompt}</p>
      </div>
      <div className='mx-auto max-w-5xl px-6 flex lg:px-8 gap-4 flex-wrap'>
        {/*<MagicSearch />*/}
        {query.isLoading ? (
          <div className='mb-8'>
            <div className='mb-6'>
              <Progress
                size='sm'
                isIndeterminate
                aria-label='Loading...'
                className='max-w-[100%]'
              />
            </div>
            <div className='flex gap-4'>
              {factsQuery.isSuccess
                ? randomIndexes.map((order, index) => {
                    return (
                      <Card className='w-[320px]' key={factsData[order]?.fact}>
                        <CardHeader className='justify-between'>
                          <div className='flex gap-5'>
                            <Avatar isBordered radius='full' size='md' src='' />
                            <div className='flex flex-col gap-1 items-start justify-center'>
                              <h4 className='text-small font-semibold leading-none text-default-600'>
                                {factsData[order]?.name}
                              </h4>
                            </div>
                          </div>
                        </CardHeader>
                        <CardBody className='px-3 py-0 text-small text-default-400 max-h-[400px]'>
                          <p>Fun fact: {factsData[order]?.fact}</p>
                        </CardBody>
                        <CardFooter className='gap-3'></CardFooter>
                      </Card>
                    );
                  })
                : null}
            </div>
          </div>
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
                      percentage={user.percentage}
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
    </div>
  );
}
