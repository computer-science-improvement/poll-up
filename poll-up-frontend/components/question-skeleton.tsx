import Image from 'next/image';
import { Textarea } from '@nextui-org/input';
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
import React from 'react';

export const QuestionSkeleton = () => {
  return (
    <div className='w-full max-w-md'>
      <Image
        className='mb-10'
        priority
        src='https://new-trainual-staging.s3.amazonaws.com/uploads/admin_account/logo/1/81456644-ab68-4706-89e2-2f559686c83d.png'
        alt='logo'
        width={200}
        height={120}
      />
      <p className='text-2xl font-semibold text-foreground mb-3'>Loading</p>

      <div className='w-full flex flex-col'>
        <Textarea
          required
          variant='faded'
          label='Your Answer'
          placeholder='More passion, more power, more pull ups 🗿'
          className='mb-6 w-full'
        />

        <div className='flex gap-4 justify-end'>
          <Button className='self-end' color='primary' variant='shadow'>
            Next question
          </Button>
          <Button
            type='button'
            className='self-end'
            color='secondary'
            variant='shadow'
          >
            Finish
          </Button>
        </div>
      </div>
    </div>
  );
};
