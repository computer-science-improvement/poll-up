export type TextQuestion = {
  type: 'text';
  title: string;
  description?: string;
};

export type Answer = {
  value: string;
  label: string;
};

export type SelectQuestion = {
  type: 'select';
  title: string;
  description?: string;
  answers: Answer[];
};

export type QuestionType = TextQuestion | SelectQuestion;

export const QUESTIONS: QuestionType[] = [
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
    answers: [
      { value: 'React', label: 'React' },
      { value: 'Vue', label: 'Vue' },
      { value: 'Angular', label: 'Angular' },
      { value: 'Svelte', label: 'Svelte' },
      { value: 'Ember', label: 'Ember' },
      { value: 'Backbone', label: 'Backbone' },
      { value: 'Meteor', label: 'Meteor' },
    ],
  },
  {
    type: 'select',
    title: 'What are your hobbies?',
    description: 'Please select your hobbies',
    answers: [
      { value: 'Reading', label: 'Reading' },
      { value: 'Writing', label: 'Writing' },
      { value: 'Coding', label: 'Coding' },
      { value: 'Gaming', label: 'Gaming' },
      { value: 'Sports', label: 'Sports' },
      { value: 'Movies', label: 'Movies' },
      { value: 'Music', label: 'Music' },
    ],
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
];
