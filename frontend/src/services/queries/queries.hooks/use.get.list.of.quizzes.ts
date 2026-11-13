import { useQuery } from "@tanstack/react-query";
import { getListOfQuizzes } from "../queries.mutations/get.list.of.quizzes";

export const useGetListOfQuizzes = () => {
    return useQuery<unknown[], unknown>({
        queryKey: ["quizzes"],
        queryFn: getListOfQuizzes,
        staleTime: 1000 * 1,
        gcTime: 1000 * 60 * 60 * 3,
        retry: 1,
    });
};