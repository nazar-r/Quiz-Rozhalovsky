import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteQuiz } from "../queries.mutations/delete.quiz";

export const useDeleteQuiz = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteQuiz(id),

        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["quizzes"] });
            const previousQuizzes = queryClient.getQueryData<any[]>(["quizzes"]);

            if (previousQuizzes) {
                queryClient.setQueryData<any[]>(["quizzes"], (prevQuizzes) =>
                    prevQuizzes?.filter((quiz) => quiz.id !== id)
                );
            }

            return { previousQuizzes };
        },

        onError: (error, _id, context) => {
            if (context?.previousQuizzes) {
                queryClient.setQueryData(["quizzes"], context.previousQuizzes);
            }

            console.error(error);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["quizzes"] });
        },
    });
};