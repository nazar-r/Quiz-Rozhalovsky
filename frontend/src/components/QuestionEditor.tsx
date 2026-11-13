import type { Question } from '../services/types';

const typesOfQuizzes = [
  { value: 'BOOLEAN', label: 'True / False' },
  { value: 'INPUT', label: 'Short text' },
  { value: 'CHECKBOX', label: 'Multiple choice' },
];

export const QuestionEditor = ({ index, question: q, onChange, onRemove, canRemove }: any) => {
  const update = (patch: Partial<Question>) => onChange({ ...q, ...patch });

  return (
    <div className="card question">
      <div className="question-head">
        <span className="badge">Question {index + 1}</span>
        <select className="input select" value={q.type} onChange={(e) => update({ type: e.target.value })}>
          {typesOfQuizzes.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select>
        {canRemove && <button type="button" className="btn btn-danger-ghost" onClick={onRemove}>Remove</button>}
      </div>

      <input className="input" placeholder="Question text" value={q.text} onChange={(e) => update({ text: e.target.value })} />

      {q.type === 'BOOLEAN' && (
        <div className="row">
          <label className="choice"><input type="radio" name={`bool-${q.id}`} checked={q.answer === true} onChange={() => update({ answer: true })} />True</label>
          <label className="choice"><input type="radio" name={`bool-${q.id}`} checked={q.answer === false} onChange={() => update({ answer: false })} />False</label>
        </div>
      )}

      {q.type === 'INPUT' && <input className="input" placeholder="Correct answer" value={typeof q.answer === 'string' ? q.answer : ''} onChange={(e) => update({ answer: e.target.value })} />}

      {q.type === 'CHECKBOX' && (
        <div className="options">
          {q.options.map((option, i) => (
            <div className="option-row" key={i}>
              <input type="checkbox" className="check" checked={option.correct} onChange={(e) => update({ options: q.options.map((item, k) => k === i ? { ...item, correct: e.target.checked } : item) })} />
              <input className="input" placeholder={`Option ${i + 1}`} value={option.text} onChange={(e) => update({ options: q.options.map((item, k) => k === i ? { ...item, text: e.target.value } : item) })} />
              {q.options.length > 2 && <button type="button" className="icon-btn" onClick={() => update({ options: q.options.filter((_, k) => k !== i) })}>✕</button>}
            </div>
          ))}
          <button type="button" className="btn btn-soft" onClick={() => update({ options: [...q.options, { text: '', correct: false }] })}>+ Add option</button>
        </div>
      )}
    </div>
  );
};