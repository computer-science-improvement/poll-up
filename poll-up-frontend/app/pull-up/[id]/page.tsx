'use client';
import Question from '@/components/question';
import Steps from '@/components/steps';
import { QUESTIONS } from '@/lib/questions';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/user';
import { useUser } from '@/providers/user-provider';

type PullUpProps = { params: { id: string } };

const getQuestionById = (id: number) => {
  return QUESTIONS.at(id);
};

const getNormalizedQuestion = (question: string) => {
  if (question) {
    return {
      type: 'text',
      title: question,
    } as const;
  }

  return null;
};

export default function PullUp({ params }: PullUpProps) {
  const id = Number(params.id);
  const user = useUser();

  const question = getQuestionById(id);

  const { data: myProfile } = useQuery({
    queryKey: ['user', String(user?.id)],
    queryFn: () => UserService.me(user?.id as string),
    enabled: !!user?.id,
  });

  const isAdditionalStep = !!myProfile?.data?.userQuestions?.find(
    (q: any) => q.question === QUESTIONS.at(-1)?.title
  );

  const { data: additionalQuestion, isLoading } = useQuery({
    queryKey: ['question', String(id)],
    queryFn: () => UserService.getQuestion(String(user?.id)),
    enabled: !!user?.id && isAdditionalStep,
  });

  const _additionalQuestion = getNormalizedQuestion(
    additionalQuestion?.data?.data
  );
  const _question = _additionalQuestion || question;

  return (
    <div className='mx-auto max-w-5xl px-6 py-12 flex lg:px-8'>
      <div className='self-start max-w-xs w-full'>
        <Steps id={id} isAdditionalStep={isAdditionalStep} />
      </div>
      <div className='flex-1 flex justify-center'>
        {_question && !isLoading && (
          <Question
            id={id}
            data={_question}
            isAdditionalStep={isAdditionalStep}
          />
        )}
      </div>
    </div>
  );
}
