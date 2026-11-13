import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuiz } from '../queries.mutations/post.quiz';

const QUIZZES_KEY = ['quizzes'];

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUIZZES_KEY });
    },
  });
};