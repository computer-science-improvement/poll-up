import { Check } from 'lucide-react';
import { QUESTIONS } from '@/lib/questions';

const steps = QUESTIONS.map((question, index) => {
  return {
    name: question.title,
    status: index === 0 ? 'current' : index === 1 ? 'complete' : 'incomplete',
    href: '#',
  };
});

type StepsProps = {
  id: number;
};

export default function Steps({ id }: StepsProps) {
  return (
    <nav className='flex' aria-label='Progress'>
      <ol role='list' className='space-y-6'>
        {steps.map((step, index) => (
          <li key={step.name}>
            {id > index ? (
              <div className='group'>
                <span className='flex items-start'>
                  <span className='relative flex h-5 w-5 flex-shrink-0 items-center justify-center'>
                    <Check
                      className='h-full w-full text-blue-600'
                      aria-hidden='true'
                    />
                  </span>
                  <span className='ml-3 text-sm font-medium text-foreground/80'>
                    {step.name}
                  </span>
                </span>
              </div>
            ) : id === index ? (
              <div className='flex items-start' aria-current='step'>
                <span
                  className='relative flex h-5 w-5 flex-shrink-0 items-center justify-center'
                  aria-hidden='true'
                >
                  <span className='absolute h-4 w-4 rounded-full bg-blue-200' />
                  <span className='relative block h-2 w-2 rounded-full bg-blue-600' />
                </span>
                <span className='ml-3 text-sm font-medium text-blue-600'>
                  {step.name}
                </span>
              </div>
            ) : (
              <div className='flex items-start'>
                <div
                  className='relative flex h-5 w-5 flex-shrink-0 items-center justify-center'
                  aria-hidden='true'
                >
                  <div className='h-2 w-2 rounded-full bg-gray-300' />
                </div>
                <p className='ml-3 text-sm font-medium text-foreground/40'>
                  {step.name}
                </p>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
