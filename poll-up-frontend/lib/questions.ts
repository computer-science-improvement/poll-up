export type Question = {
  title: string;
  description?: string;
  type: 'text' | 'select';
};

export const QUESTIONS: Question[] = [
  {
    type: 'text',
    title: 'What is your name?',
    description: 'Please enter your full name',
  },
  {
    type: 'text',
    title: 'How old are you?',
    description: 'Please enter your age',
  },
  {
    type: 'text',
    title: 'What is your position?',
    description: 'Please enter your position',
  },
  {
    type: 'text',
    title: 'How many years of experience do you have?',
    description: 'Please enter your years of experience',
  },
  {
    type: 'select',
    title: 'What is your Tech Stack?',
    description: 'Please select your Tech Stack',
  },
  {
    type: 'text',
    title: 'What is your favorite book?',
    description: 'Please enter your favorite book',
  },
  {
    type: 'text',
    title: 'Tell us about your educational background',
    description: 'Please enter your educational background',
  },
  {
    type: 'text',
    title: 'What is your type of character?',
    description: 'Please enter your type of character',
  },
  {
    type: 'select',
    title: 'What are your hobbies?',
    description: 'Please select your hobbies',
  },
];
