import { Link, useParams } from 'react-router-dom';
import { QuestionView } from '../components/QuestionView';
import { useGetQuiz } from '../services/queries/queries.hooks/use.get.quiz';

export const QuizzesDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetQuiz(id ?? '');

  if (isLoading) return <p className="muted">Loading...</p>;
  if (isError) return <div className="alert">{error.message}</div>;
  if (!data) return null;

  return (
    <div className="stack">
      <Link to="/quizzes" className="back">← Back to quizzes</Link>
      <h1 className="page-title">{data.title}</h1>
      {data.questions.map((question, index) => <QuestionView key={question.id} index={index} question={question} />)}
    </div>
  );
};