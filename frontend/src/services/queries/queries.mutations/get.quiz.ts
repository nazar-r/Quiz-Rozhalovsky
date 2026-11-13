export const getQuiz = async (quizId: string): Promise<unknown> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/quizzes/${quizId}`, {
        method: 'GET',
    });

    if (!response.ok) return

    const data = await response.json();
    return data;
};