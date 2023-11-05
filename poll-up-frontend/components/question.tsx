'use client';
import Link from 'next/link';
import Image from 'next/image';
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

export default function Question({
  id,
  title,
  description,
  type,
  answers,
}: QuestionProps) {
  const nextId = QUESTIONS.length - 1 === id ? 0 : id + 1;

  return (
    <div className='w-full max-w-md'>
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
            variant='faded'
            label='Your Answer'
            placeholder='More passion, more power, more pull ups 🗿'
            className='mb-6 w-full'
          />
        )}

        {type === 'select' && answers && (
          <Select
            variant='faded'
            label='Select'
            selectionMode='multiple'
            className='mb-6'
          >
            {answers.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        )}

        <Button
          as={Link}
          href={`${nextId}`}
          className='self-end'
          color='primary'
          variant='shadow'
        >
          Next question
        </Button>
      </div>
    </div>
  );
}
