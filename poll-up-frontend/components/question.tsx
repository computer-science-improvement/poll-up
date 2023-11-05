'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, Select, SelectItem } from '@nextui-org/react';
import { Textarea } from '@nextui-org/input';

import { Answer, QuestionMeta, QUESTIONS } from '@/lib/questions';
import { BASE_URL } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { UserService } from '@/services/user';
import { useUser } from '@/providers/user-provider';

type QuestionProps = {
  id: number;
  data: {
    title: string;
    description?: string;
    type: 'text' | 'select';
    answers?: Answer[];
    meta?: QuestionMeta;
    patchField?: string;
  };
};

type QuestionFormValues = {
  answer: string;
};

export default function Question({ id, data: question }: QuestionProps) {
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
  });

  const answerQuestion = useMutation({
    mutationFn: UserService.answerQuestion,
    onSuccess: () => {
      if (isLastQuestion) {
        finalize.mutateAsync(String(user?.id));
      } else {
        goToNextQuestion();
      }
    },
  });

  const { register, handleSubmit, formState } = useForm<QuestionFormValues>({
    defaultValues: {
      answer: '',
    },
  });

  const nextId = QUESTIONS.length - 1 === id ? 0 : id + 1;
  const isLastQuestion = QUESTIONS.length - 1 === id;

  const goToNextQuestion = () => {
    router.push(`/pull-up/${nextId}`);
  };

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
      <p className='text-2xl font-semibold text-foreground mb-2'>
        {question.title}
      </p>
      <span className='text-foreground/60 inline-block mb-6'>
        {question.description}
      </span>

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

        <Button
          type='submit'
          className='self-end'
          color='primary'
          variant='shadow'
        >
          {isLastQuestion ? 'Finish' : 'Next question'}
        </Button>
      </div>
    </form>
  );
}
