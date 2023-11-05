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
import React, { useState, useEffect } from 'react';
import { Kbd } from '@nextui-org/kbd';
import { useMutation } from '@tanstack/react-query';
import { MagicSearchService } from '@/services/magic-search';

export const useKeyboardShortcut = (callback: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      callback(event);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);
};

const MagicSearch = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const searchMutation = useMutation({
    mutationFn: MagicSearchService.search,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleClick = () => {
    const clenString = prompt?.replaceAll('\n', '');
    const searchParams = new URLSearchParams({ prompt: clenString });
    router.push(`${ROUTES.MAGIC_SEARCH}?${searchParams}`);
    onClose();
    searchMutation.mutate(clenString);
  };
  const handleChangePrompt = (e: any) => {
    setPrompt(e.target.value);
  };

  const onKeyOpen = (event: KeyboardEvent) => {
    if (event.metaKey && event.key === 'k') {
      onOpen();
    }
  };

  const onKeyClose = (event: KeyboardEvent) => {
    if (event.key === 'Esc') {
      close();
    }
  };

  const onKeySubmit = (event: KeyboardEvent) => {
    if (event.metaKey && event.key === 'Enter') {
      handleClick();
    }
  };

  useKeyboardShortcut(onKeyOpen);
  useKeyboardShortcut(onKeyClose);
  useKeyboardShortcut(onKeySubmit);

  return (
    <>
      <div onClick={onOpen} className=''>
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[10rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small !cursor-pointer caret-transparent',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 !cursor-pointer',
          }}
          value=''
          placeholder='Get Secrets ...'
          size='sm'
          startContent={<Search />}
          endContent={<Kbd keys={['command']}>K</Kbd>}
          type='search'
        />
      </div>

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
                  autoFocus
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
                <Button color='primary' onPress={handleClick}>
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
