'use client';
import { Avatar } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';

const UserCard = () => {
  return (
    <>
      <Card className='max-w-[340px]'>
        <CardHeader className='justify-between'>
          <div className='flex gap-5'>
            <Avatar isBordered radius='full' size='md' src='' />
            <div className='flex flex-col gap-1 items-start justify-center'>
              <h4 className='text-small font-semibold leading-none text-default-600'>
                Zoey Lang
              </h4>
              <h5 className='text-small tracking-tight text-default-400'>
                @zoeylang
              </h5>
            </div>
          </div>
        </CardHeader>
        <CardBody className='px-3 py-0 text-small text-default-400'>
          <p>
            Frontend developer and UI/UX enthusiast. Join me on this coding
            adventure!
          </p>
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
