import type { Props } from '../services/types';

const quizLabels = [
  { value: 'BOOLEAN', label: 'True / False' },
  { value: 'INPUT', label: 'Short text' },
  { value: 'CHECKBOX', label: 'Multiple choice' },
];

export const QuestionView = ({ index, question: q }: Pick<Props, 'index' | 'question'>) => (
  <div className="card question">
    <div className="question-head">
      <span className="badge">Question {index + 1}</span>
      <span className="tag">{quizLabels.find(({ value }) => value === q.type)?.label}</span>
    </div>
    <h3 className="question-text">{q.text}</h3>

    {q.type === 'BOOLEAN' && (
      <div className="row">
        <label className="choice"><input type="radio" disabled checked={q.answer === true} readOnly />True</label>
        <label className="choice"><input type="radio" disabled checked={q.answer === false} readOnly />False</label>
      </div>
    )}

    {q.type === 'INPUT' && <input className="input" disabled value={typeof q.answer === 'string' ? q.answer : ''} readOnly />}

    {q.type === 'CHECKBOX' && (
      <div className="options">
        {q.options.map((option, index) => <label className="choice" key={index}><input type="checkbox" disabled checked={option.correct} readOnly />{option.text}</label>)}
      </div>
    )}
  </div>
);