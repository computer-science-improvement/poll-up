import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { User } from '../users/entities/user.entity';

require('dotenv').config();

@Injectable()
export class OpenaiService {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async generateNextQuestion(user: User): Promise<string> {
    const basicPrompt = `Ask the user a light-hearted, fun interview-style question. Question's should be simple (max of 2 sentences) and make sure you only ask 1 question. 
    Use existing information to expand current user profile.
    Ensure that situation you describe is real.
    Preferred themes: user hobbies, career, pets.
    Tone: friendly, approachable, stimulating, casual
     
    Please structure your reply as follows:
    Question: [prepared question]"\n\n\n`;
    const userInfoPrompt = this.getQuestionPromptFromUser(user);

    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: basicPrompt + userInfoPrompt }],
      model: 'gpt-3.5-turbo',
    });

    return (
      chatCompletion.choices[0].message.content?.replace('Question: ', '') ?? ''
    );
  }

  getQuestionPromptFromUser(user: User) {
    let prompt = `name: ${user.name}, age: ${user.age}, position: ${user.position}, hobbies: ${user.hobbies}, experience: ${user.experience}. And here is previous questions and answers:\n`;

    for (const question of user.userQuestions) {
      prompt += `Question: ${question.question}; Answer: ${question.answer}\n\n`;
    }

    return prompt;
  }
}
