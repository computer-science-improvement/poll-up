import Question from '@/components/question';
import Steps from '@/components/steps';

export default function PullUp() {
  return (
    <div className='mx-auto max-w-5xl px-6 py-12 flex lg:px-8'>
      <div className='self-start max-w-xs w-full'>
        <Steps />
      </div>
      <div className='flex-1 flex justify-center'>
        <Question
          answerType='select'
          title='What do you need help with?'
          description="We're a full service agency with experts ready to help."
        />
      </div>
    </div>
  );
}
