'use client';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import Image from 'next/image';
import { useEffect } from 'react';
import { useUser } from '@/providers/user-provider';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export default function Home() {
  const user = useUser();

  useEffect(() => {
    user?.setId(null);
  }, []);

  return (
    <div className='relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14'>
      <div
        className='absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] light:bg-white dark:bg-background/70 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96'
        aria-hidden='true'
      />
      <div className='mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8'>
          <h1 className='max-w-2xl text-4xl font-bold tracking-tight light:text-gray-900 dark:text-gray-300 sm:text-6xl lg:col-span-2 xl:col-auto'>
            We’re changing the way people connect.
          </h1>
          <div className='mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1'>
            <p className='text-lg leading-8 text-gray-600'>
              We are on a mission to transform the way people connect with each
              other, offering innovative and exciting ways to build meaningful
              relationships, share experiences, and create lasting memories.
            </p>
            <div className='mt-10 flex items-center gap-x-6'>
              <Button
                as={Link}
                color='primary'
                variant='shadow'
                href={ROUTES.PULL_UP}
              >
                Get started
              </Button>
              <Button color='primary' variant='light'>
                Learn more <span aria-hidden='true'>→</span>
              </Button>
            </div>
          </div>
          <Image
            priority
            src='https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80'
            alt=''
            className='mt-10 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36'
            width={512}
            height={340}
          />
        </div>
      </div>
      <div className='absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t dark:from-background light:from-white sm:h-32' />
    </div>
  );
}
