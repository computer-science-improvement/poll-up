'use client';
import {
  Avatar,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  Progress,
  ModalFooter,
  Button,
  Modal,
  useDisclosure,
} from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { useQuery } from '@tanstack/react-query';
import { MagicSearchService } from '@/services/magic-search';
import { Textarea } from '@nextui-org/input';
import React from 'react';

type UserCardProps = {
  id: string;
  name: string;
  reason: string;
};

const UserCard = (props: UserCardProps) => {
  const id = props.id;
  const name = props?.name ?? '';
  const reason = props?.reason ?? '';
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const query = useQuery({
    queryKey: ['get-user-bio-by-id', id],
    queryFn: () => MagicSearchService.getBio(id),
    enabled: !!id && isOpen,
  });

  const bio = query?.data?.data?.data ?? '';

  return (
    <>
      <Card className='w-[400px]'>
        <CardHeader className='justify-between'>
          <div className='flex gap-5' onClick={onOpen}>
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
          <p>{reason}</p>
        </CardBody>
        <CardFooter className='gap-3'></CardFooter>
      </Card>
      <Modal
        backdrop='opaque'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
        closeButton={<></>}
      >
        <ModalContent className='max-w-[800px]'>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{`Bio by: ${name}`}</ModalHeader>
              <ModalBody>
                {query.isLoading ? (
                  <Progress
                    size='sm'
                    isIndeterminate
                    aria-label='Loading...'
                    className='max-w-[800px]'
                  />
                ) : (
                  <pre>{bio}</pre>
                )}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserCard;
