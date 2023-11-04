'use client';
import { Input, Textarea } from '@nextui-org/input';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Divider,
  Progress,
} from '@nextui-org/react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import React, { useState } from 'react';

const MagicSearch = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');

  const handleChangePrompt = (e: any) => {
    console.log(e.target.value);
    setPrompt(e.target.value);
  };

  const handleClick = (onClose: any) => () => {
    const clenString = prompt?.replaceAll('\n', '');
    const searchParams = new URLSearchParams({ prompt: clenString });
    router.push(`${ROUTES.MAGIC_SEARCH}?${searchParams}`);
    onClose();
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Input
        onClick={onOpen}
        classNames={{
          base: 'max-w-full sm:max-w-[10rem] h-10',
          mainWrapper: 'h-full',
          input: 'text-small',
          inputWrapper:
            'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
        }}
        placeholder='Get Secrets ...'
        size='sm'
        startContent={<Search />}
        type='search'
      />
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
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Get Secrets ...
              </ModalHeader>
              <ModalBody>
                <Textarea
                  onClick={onOpen}
                  classNames={{
                    base: 'max-w-full',
                    mainWrapper: 'h-full',
                    input: 'text-small',
                    inputWrapper:
                      'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
                  }}
                  placeholder='Magic Prompt ...'
                  type='search'
                  maxRows={5}
                  value={prompt}
                  onChange={handleChangePrompt}
                />
                <Divider className='my-2' />
                <Progress
                  size='sm'
                  isIndeterminate
                  aria-label='Loading...'
                  className='max-w-md'
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={handleClick(onClose)}>
                  Search
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MagicSearch;
