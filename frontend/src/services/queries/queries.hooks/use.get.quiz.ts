import { useQuery } from "@tanstack/react-query";
import { getQuiz } from "../queries.mutations/get.quiz";

export const useGetQuiz = (quizId: string) => {
  return useQuery<unknown, unknown>({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuiz(quizId),
    staleTime: 1000 * 1,
    gcTime: 1000 * 60 * 60 * 3,
    retry: 1,
    enabled: Boolean(quizId),
  });
};