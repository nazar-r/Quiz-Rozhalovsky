import type { Question } from '../services/types';

export class QuestionUtils {
  static createBlankQuestion = (): Question => ({
    id: crypto.randomUUID(),
    type: 'BOOLEAN',
    text: '',
    answer: true,
    options: [
      { text: '', correct: false },
      { text: '', correct: false },
    ],
  });

  static normalizeQuestion = ({ type, text, answer, options }: Question) => {
    const base = { type, text };

    if (type === 'CHECKBOX') return { ...base, options };
    if (type === 'BOOLEAN') return { ...base, answer: answer === true };

    return { ...base, answer: typeof answer === 'string' ? answer : '' };
  };
}