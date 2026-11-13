import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateQuiz } from '../services/queries/queries.hooks/use.post.quiz';
import { QuestionUtils } from '../services/utils';
import { QuestionEditor } from '../components/QuestionEditor';
import type { Question } from '../services/types';
import type { FormEvent } from 'react';

export const CreateQuizPage = () => {
  const navigate = useNavigate();
  const create = useCreateQuiz();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([QuestionUtils.createBlankQuestion()]);

  const switchQuizQuestion = (id: string, next: Question) => {
    setQuestions((list) => list.map((question) => {
      if (question.id !== id) return question;
      return question.type === next.type ? next : { ...next, answer: next.type === 'BOOLEAN' ? true : '' };
    }));
  };

  const setQuiz = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    create.mutate({
      title,
      questions: questions.map((question) => ({
        ...QuestionUtils.normalizeQuestion(question),
        type: question.type,
        answer: question.answer,
        ...(question.type === 'CHECKBOX' ? { options: question.options } : {}),
      })),
    }, { onSuccess: () => navigate('/quizzes') });
  };

  return (
    <form onSubmit={setQuiz} className="stack">
      <h1 className="page-title">Create quiz</h1>
      <div className="card">
        <input className="input input-lg" placeholder="Quiz title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      {questions.map((question, index) => (
        <QuestionEditor key={question.id} index={index} question={question} canRemove={questions.length > 1} onChange={(next: Question) => switchQuizQuestion(question.id, next)} onRemove={() => setQuestions((list) => list.filter((item) => item.id !== question.id))} />
      ))}

      <div className="actions">
        <button type="button" className="btn btn-soft" onClick={() => setQuestions((list) => [...list, QuestionUtils.createBlankQuestion()])}>+ Add question</button>
        <button type="submit" className="btn btn-primary" disabled={create.isPending}>{create.isPending ? 'Saving...' : 'Save quiz'}</button>
      </div>

      {create.isError && <div className="alert">{create.error.message}</div>}
    </form>
  );
};