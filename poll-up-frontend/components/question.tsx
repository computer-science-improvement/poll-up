'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, Select, SelectItem } from '@nextui-org/react';
import { Textarea } from '@nextui-org/input';

import { Answer, QUESTIONS } from '@/lib/questions';

type QuestionProps = {
  id: number;
  title: string;
  description?: string;
  type: 'text' | 'select';
  answers?: Answer[];
};

type QuestionFormValues = {
  answer: string;
};

export default function Question({
  id,
  title,
  description,
  type,
  answers,
}: QuestionProps) {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<QuestionFormValues>({
    defaultValues: {
      answer: '',
    },
  });

  const nextId = QUESTIONS.length - 1 === id ? 0 : id + 1;

  const onSubmit = (data: QuestionFormValues) => {
    console.log(data.answer);
    router.push(`/pull-up/${nextId}`);
  };

  const isInvalid = formState.errors.answer;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md'>
      <Image
        className='mb-10'
        priority
        src='/vercel.svg'
        alt='logo'
        width={141}
        height={64}
      />
      <p className='text-2xl font-semibold text-foreground mb-2'>{title}</p>
      <span className='text-foreground/60 inline-block mb-6'>
        {description}
      </span>

      <div className='w-full flex flex-col'>
        {type === 'text' && (
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

        {type === 'select' && answers && (
          <Select
            {...register('answer', { required: true })}
            variant='faded'
            label='Select'
            selectionMode='multiple'
            className='mb-6'
            isInvalid={!!isInvalid}
          >
            {answers.map((animal) => (
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
          Next question
        </Button>
      </div>
    </form>
  );
}
