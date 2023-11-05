'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Textarea } from '@nextui-org/input';

import { Answer, QuestionMeta, QUESTIONS } from '@/lib/questions';
import { BASE_URL } from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/user';
import { useUser } from '@/providers/user-provider';
import React, { useState } from 'react';
import { MagicSearchService } from '@/services/magic-search';

type QuestionProps = {
  id: number;
  isAdditionalStep: boolean;
  data: {
    title: string;
    description?: string;
    type: 'text' | 'select';
    answers?: Answer[];
    meta?: QuestionMeta;
    patchField?: string;
  };
  profile: any;
};

type QuestionFormValues = {
  answer: string;
};

export default function Question({
  id,
  data: question,
  isAdditionalStep,
  profile,
}: QuestionProps) {
  const [isOpen, onOpenChange] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();
  const user = useUser();

  const initUser = useMutation({
    mutationFn: UserService.init,
    onSuccess: (data) => {
      user?.setId(data?.data.id);
      goToNextQuestion();
    },
  });

  const updateUser = useMutation({
    mutationFn: UserService.update,
    onSuccess: () => goToNextQuestion(),
  });

  const finalize = useMutation({
    mutationFn: UserService.finalize,
    onSuccess: () => {
      setIsFinished(true);
      onOpenChange(true);
    },
  });

  const answerQuestion = useMutation({
    mutationFn: UserService.answerQuestion,
    onSuccess: () => goToNextQuestion(),
  });

  const { register, handleSubmit, formState } = useForm<QuestionFormValues>({
    defaultValues: {
      answer: '',
    },
  });

  const nextId = id + 1;
  const handleFinalize = async () => {
    await finalize.mutateAsync(String(user?.id));
  };

  const goToNextQuestion = () => {
    router.push(`/pull-up/${nextId}`);
  };

  const query = useQuery({
    queryKey: ['get-user-by-id', String(user?.id)],
    queryFn: () => MagicSearchService.getBio(String(user?.id)),
    enabled: !!String(user?.id) && isOpen,
  });

  const onSubmit = async (data: QuestionFormValues) => {
    switch (question.meta) {
      case 'initial': {
        await initUser.mutateAsync(data.answer);
        return;
      }
      case 'patch': {
        if (question.patchField && user) {
          await updateUser.mutateAsync({
            id: String(user.id),
            data: {
              [question.patchField]: data.answer,
            },
          });
        }
        return;
      }
      default:
        await answerQuestion.mutateAsync({
          id: String(user?.id),
          data: {
            question: question.title,
            answer: data.answer,
          },
        });
        goToNextQuestion();
        return;
    }
  };

  const bio = query?.data?.data?.data ?? '';

  const isInvalid = formState.errors.answer;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md'>
      <Image
        className='mb-10'
        priority
        src='https://new-trainual-staging.s3.amazonaws.com/uploads/admin_account/logo/1/81456644-ab68-4706-89e2-2f559686c83d.png'
        alt='logo'
        width={200}
        height={120}
      />
      <p className='text-2xl font-semibold text-foreground mb-3'>
        {question.title}
      </p>
      {question.description && (
        <span className='text-foreground/60 inline-block mb-6'>
          {question.description}
        </span>
      )}

      <div className='w-full flex flex-col'>
        {question.type === 'text' && (
          <Textarea
            {...register('answer', { required: true })}
            required
            variant='faded'
            label='Your Answer'
            placeholder='More passion, more power, more pull ups 🗿'
            className='mb-6 w-full'
            isInvalid={!!isInvalid}
          />
        )}

        {question.type === 'select' && question.answers && (
          <Select
            {...register('answer', { required: true })}
            variant='faded'
            label='Select'
            selectionMode='multiple'
            className='mb-6'
            isInvalid={!!isInvalid}
          >
            {question.answers.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        )}

        <div className='flex gap-4 justify-end'>
          <Button
            disabled={isFinished}
            type='submit'
            className='self-end'
            color='primary'
            variant='shadow'
          >
            Next question
          </Button>
          {isAdditionalStep && (
            <Button
              disabled={isFinished}
              type='button'
              onClick={handleFinalize}
              className='self-end'
              color='secondary'
              variant='shadow'
            >
              Finish
            </Button>
          )}
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
          <ModalContent className='max-w-[800px]'>
            {() => (
              <>
                <ModalHeader className='flex flex-col gap-1'>{`Bio by: ${profile?.data?.name}`}</ModalHeader>
                <ModalBody>
                  {query.isLoading ? (
                    <Progress
                      size='sm'
                      isIndeterminate
                      aria-label='Loading...'
                      className='max-w-[800px]'
                    />
                  ) : (
                    <div>{bio}</div>
                  )}
                </ModalBody>
                <ModalFooter></ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </form>
  );
}
