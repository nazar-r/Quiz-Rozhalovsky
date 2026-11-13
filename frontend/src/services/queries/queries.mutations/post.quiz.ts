export const createQuiz = async (body: any): Promise<unknown> => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/quizzes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) return
};