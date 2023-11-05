'use client';
import Image from 'next/image';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { Textarea } from '@nextui-org/input';

type QuestionProps = {
  title: string;
  description: string;
  answerType: 'text' | 'select';
};

export const animals = [
  {
    label: 'Cat',
    value: 'cat',
    description: 'The second most popular pet in the world',
  },
  {
    label: 'Dog',
    value: 'dog',
    description: 'The most popular pet in the world',
  },
  {
    label: 'Elephant',
    value: 'elephant',
    description: 'The largest land animal',
  },
  { label: 'Lion', value: 'lion', description: 'The king of the jungle' },
  { label: 'Tiger', value: 'tiger', description: 'The largest cat species' },
  {
    label: 'Giraffe',
    value: 'giraffe',
    description: 'The tallest land animal',
  },
  {
    label: 'Dolphin',
    value: 'dolphin',
    description: 'A widely distributed and diverse group of aquatic mammals',
  },
  {
    label: 'Penguin',
    value: 'penguin',
    description: 'A group of aquatic flightless birds',
  },
  {
    label: 'Zebra',
    value: 'zebra',
    description: 'A several species of African equids',
  },
  {
    label: 'Shark',
    value: 'shark',
    description:
      'A group of elasmobranch fish characterized by a cartilaginous skeleton',
  },
  {
    label: 'Whale',
    value: 'whale',
    description: 'Diverse group of fully aquatic placental marine mammals',
  },
  {
    label: 'Otter',
    value: 'otter',
    description: 'A carnivorous mammal in the subfamily Lutrinae',
  },
  {
    label: 'Crocodile',
    value: 'crocodile',
    description: 'A large semiaquatic reptile',
  },
];

export default function Question({
  title = 'What do you need help with?',
  description = "We're a full service agency with experts ready to help.",
  answerType = 'text',
}: QuestionProps) {
  return (
    <div>
      <Image
        className='mb-10'
        priority
        src='https://new-trainual-staging.s3.amazonaws.com/uploads/admin_account/logo/1/81456644-ab68-4706-89e2-2f559686c83d.png'
        alt='logo'
        width={200}
        height={120}
      />
      <p className='text-2xl font-semibold text-foreground mb-2'>{title}</p>
      <span className='text-foreground/60 inline-block mb-6'>
        {description}
      </span>

      <div className='max-w-md flex flex-col'>
        {answerType === 'text' && (
          <Textarea
            variant='faded'
            label='Your Answer'
            placeholder='More passion, more power, more pull ups 🗿'
            className='mb-6 max-w-md'
          />
        )}

        {answerType === 'select' && (
          <Select
            variant='faded'
            label='Select an animal'
            className='mb-6 max-w-md'
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        )}

        <Button className='self-end' color='primary' variant='shadow'>
          Next question
        </Button>
      </div>
    </div>
  );
}
