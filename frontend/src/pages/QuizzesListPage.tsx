import { Link } from 'react-router-dom';
import { useDeleteQuiz } from '../services/queries/queries.hooks/use.delete.quiz';
import { useGetListOfQuizzes } from '../services/queries/queries.hooks/use.get.list.of.quizzes';

export const QuizzesListPage = () => {
  const { data, isLoading, isError, error } = useGetListOfQuizzes();
  const remove = useDeleteQuiz();

  if (isLoading) return <p className="muted">Loading...</p>;
  if (isError) return <div className="alert">{error.message}</div>;
  if (!data) return null;

  return (
    <div className="stack">
      <div className="page-head">
        <h1 className="page-title">Quizzes</h1>
        <Link to="/create" className="btn btn-primary">+ New quiz</Link>
      </div>

      {!data.length && (
        <div className="card empty">
          <p>No quizzes yet.</p>
          <Link to="/create" className="btn btn-primary">Create your first quiz</Link>
        </div>
      )}

      <div className="grid">
        {data.map((quiz, index) => (
          <div className={`card quiz c${index % 5}`} key={quiz.id}>
            <Link to={`/quizzes/${quiz.id}`} className="quiz-link">
              <h2 className="quiz-title">{quiz.title}</h2>
              <span className="tag">{quiz.questions.length} {quiz.questions.length === 1 ? 'question' : 'questions'}</span>
            </Link>

            <button type="button" className="icon-btn danger" title="Delete quiz" disabled={remove.isPending} onClick={() => remove.mutate(quiz.id)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};