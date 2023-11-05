'use client';
import { Avatar } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { useQuery } from '@tanstack/react-query';
import { MagicSearchService } from '@/services/magic-search';

type UserCardProps = {
  id: string;
  name: string;
};

const UserCard = (props: UserCardProps) => {
  const id = props.id;
  const name = props.name;

  const query = useQuery({
    queryKey: ['get-user-by-id', id],
    queryFn: () => MagicSearchService.getBio(id),
    enabled: !!id,
  });

  const bio = query?.data?.data?.data ?? '';

  return (
    <>
      <Card className='min-w-[340px] max-w-[440px] '>
        <CardHeader className='justify-between'>
          <div className='flex gap-5'>
            <Avatar isBordered radius='full' size='md' src='' />
            <div className='flex flex-col gap-1 items-start justify-center'>
              <h4 className='text-small font-semibold leading-none text-default-600'>
                {name}
              </h4>
              <h5 className='text-small tracking-tight text-default-400'>-</h5>
            </div>
          </div>
        </CardHeader>
        <CardBody className='px-3 py-0 text-small text-default-400 max-h-[400px]'>
          <p>{bio}</p>
          <span className='pt-2'>
            #FrontendWithZoey
            <span className='py-2' aria-label='computer' role='img'>
              💻
            </span>
          </span>
        </CardBody>
        <CardFooter className='gap-3'></CardFooter>
      </Card>
    </>
  );
};

export default UserCard;
