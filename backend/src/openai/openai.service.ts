import {Injectable} from '@nestjs/common';
import OpenAI from 'openai';
import {User} from '../users/entities/user.entity';
import {UserQuestion} from '../users/entities/user-question.entity';
import {ChatCompletionMessageParam} from 'openai/resources';
// @ts-nocheck

require('dotenv').config();

@Injectable()
export class OpenaiService {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async generateNextQuestion(user: User): Promise<string> {
    const basicPrompt = `Ask the user a light-hearted, concrete interview-style question. Question's should be simple (max of 2 sentences) and make sure you only ask 1 question. 
    Ensure that answers to previous questions is real. Ask clarifying question if needed.
    Restrictions: question should be real, question should be about one specific theme
    Preferred themes: user hobbies, career, pets.
    Tone: friendly, approachable, stimulating, casual
     
    Please structure your reply as follows:
    Question: [prepared question]\n\n\n`;
    const userInfoPrompt = this.getQuestionPromptFromUser(user);

    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: basicPrompt + userInfoPrompt }],
      model: 'gpt-3.5-turbo',
    });

    return (
      chatCompletion.choices[0].message.content?.replace('Question: ', '') ?? ''
    );
  }

  async generateMockAnswer(question: string, name: string): Promise<string> {
    const basicPrompt =
      `
    Response to the provided question as an ${name}
     
    Please structure your reply as follows:
    Answer: [prepared answer]\n\n\n` + `Question: ${question}`;

    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: basicPrompt }],
      model: 'gpt-3.5-turbo',
    });

    return (
      chatCompletion.choices[0].message.content?.replace('Answer: ', '') ?? ''
    );
  }

  async createUserFact(user: User) {
    const prompt =`Prepare short (Maximum 15 words) interesting fact about that user. Here is user biography: \n\n\n${user.bio}\n\n\n
    Ensure that you include name in answer. Name is ${user.name}
    Ensure that your answer shorter than 16 words.
     Please structure your reply as follows:
    Fact: [prepared fact]`


    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 1,
      n: 1,
    });

    return (
        chatCompletion.choices[0].message.content?.replace('Fact: ', '') ?? ''
    );
  }

  async getBio(user: User) {
    const basicPrompt = `Prepare well-structured user bio.
     Write it from the first person. Ensure that you avoid greetings.
     Divide with newlines separate bio parts. 
    Please structure your reply as follows:
    Bio: [prepared bio]"\n\n\n`;
    const userInfoPrompt = this.getQuestionPromptFromUser(user, [
      'name',
      'age',
    ]);

    let prompt = basicPrompt + userInfoPrompt
    if (prompt.length > 4096) {
      prompt = prompt.slice(0, 4096)
    }

    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 1,
      n: 1,
    });

    return (
      chatCompletion.choices[0].message.content?.replace('Bio: ', '') ?? ''
    );
  }

  async createQuestionSummary(question: UserQuestion) {
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are helpful, accurate assistant' },
        { role: 'assistant', content: question.question },
        { role: 'user', content: question.answer },
        {
          role: 'user',
          content:
            'Summarize question and answer. Keep it short (maximum 1 sentence or 15 words)',
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 1,
      n: 1,
    });

    console.log(chatCompletion.choices[0]);

    return (
      chatCompletion.choices[0].message.content?.trim().replace('\n', '') ?? ''
    );
  }

  async createUserSummary(user: User) {
    const facts = user.userQuestions.map(({ summary }) => summary).join('\n');
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Prepare user info that includes main hobbies, activities and short description using this facts:\n\n\n${facts}\n\n\nKeep it short. Maximum 100 words. Return answer in format:\nAnswer: [here your answer]`,
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 1,
      n: 1,
    });

    console.log(chatCompletion.choices[0]);

    return (
      chatCompletion.choices[0].message.content
        ?.trim()
        .replace('\n', '')
        .replace('Answer: ', '') ?? ''
    );
  }

  async magicSearch(question: string, users: User[]) {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content:
          "You company assistant. Analyze only people working in the user company. And use data that contains in json. Simulate JSON-based API. So you can't say something except json.",
      },
    ];
    const promptUsers: any[] = [];
    for (const user of users) {
      if (!user.hobbies) {
        continue;
      }
      const promptUser = {
        id: user.id,
        name: user.name,
        hobbies: user.hobbies,
        info: user.summary,
      };
      promptUsers.push(promptUser);
    }

    messages.push({
      role: 'system',
      content: `Here is a json with all company people: \n\n\n${JSON.stringify(
        promptUsers,
      )}\n\n\n`,
    });
    messages.push({ role: 'user', content: `${question}` });

    messages.push({
      role: 'system',
      content: `Return empty array if no one match needed criteria. Respond in json format with the following structure: "{"users":[{"id": [id of user that match criteria], "name": [name of user that match criteria], "reason": [reason why you think user is matched], "percentage": [percentage with that person matched criteria]}].`,
    });

    console.log(messages);

    const chatCompletion = await this.openai.chat.completions.create({
      messages: messages,
      model: 'gpt-3.5-turbo-16k',
      temperature: 0.2,
      n: 1,
    });

    console.log(chatCompletion.choices[0].message.content);

    try {
      return JSON.parse(
        chatCompletion.choices[0].message.content ?? '{"users: []"}',
      );
    } catch (e) {
      return { users: [] };
    }
  }

  getQuestionPromptFromUser(user: User, skip: string[] = [], answers = true) {
    let prompt = '';
    if (!skip.includes('name')) {
      prompt += `name: ${user.name}, `;
    }
    if (!skip.includes('position')) {
      prompt += `position: ${user.position}, `;
    }
    if (!skip.includes('hobbies')) {
      prompt += `hobbies: ${user.hobbies}, `;
    }

    if (answers) {
      if (user.userQuestions.length > 0) {
        prompt += `And here is previous questions and answers:\n`;
      }

      for (const question of user.userQuestions) {
        prompt += `Question: ${question.question}; Answer: ${question.answer}\n\n`;
      }
    }

    return prompt;
  }
}
