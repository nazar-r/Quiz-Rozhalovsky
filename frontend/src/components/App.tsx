import { Layout } from './Layout';
import { CreateQuizPage } from '../pages/CreateQuizPage';
import { QuizzesListPage } from '../pages/QuizzesListPage';
import { QuizzesDetailsPage } from '../pages/QuizzesDetailsPage';
import { Navigate, Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/quizzes" replace />} />
        <Route path="/create" element={<CreateQuizPage />} />
        <Route path="/quizzes" element={<QuizzesListPage />} />
        <Route path="/quizzes/:id" element={<QuizzesDetailsPage />} />
      </Route>
    </Routes>
  );
}
