import { AnyUseMutationOptions } from "@tanstack/react-query";

export const getListOfQuizzes = async (): Promise<unknown[]> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/quizzes`, {
        method: "GET",
    });

    if (!response.ok) return

    const data: AnyUseMutationOptions[] = await response.json();
    return data;
};