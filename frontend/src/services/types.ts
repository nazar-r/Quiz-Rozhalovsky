export type Question = {
  id: string;
  type: string;
  text: string;
  answer: boolean | string;
  options: { text: string; correct: boolean }[];
};

export type Props = {
  index: number;
  question: Question;
  onChange: (question: Question) => void;
  onRemove: () => void;
  canRemove: boolean;
};