export const deleteQuiz = async (quizId: string) => {
    const request = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/quizzes/${quizId}`, {
        method: "DELETE",
    });

    if (!request.ok) return
};