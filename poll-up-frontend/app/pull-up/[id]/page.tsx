import Question from '@/components/question';
import Steps from '@/components/steps';
import { QUESTIONS } from '@/lib/questions';

type PullUpProps = { params: { id: string } };

const getQuestionById = (id: number) => {
  return QUESTIONS.at(id);
};

export default function PullUp({ params }: PullUpProps) {
  const id = Number(params.id);

  const question = getQuestionById(id);

  return (
    <div className='mx-auto max-w-5xl px-6 py-12 flex lg:px-8'>
      <div className='self-start max-w-xs w-full'>
        <Steps id={id} />
      </div>
      <div className='flex-1 flex justify-center'>
        {question && (
          <Question
            id={id}
            answers={question.type === 'select' ? question.answers : undefined}
            type={question.type}
            title={question.title}
            description={question.description}
          />
        )}
      </div>
    </div>
  );
}
