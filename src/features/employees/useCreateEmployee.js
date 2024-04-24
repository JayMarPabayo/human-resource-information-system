import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateEmployee } from "../../services/apiEmployees";

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  const { mutate: createEmployee, isLoading: employeeCreating } = useMutation({
    mutationFn: createUpdateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee"],
      });
    },
    onError: (err) => console.error(err.message),
  });

  return {
    employeeCreating,
    createEmployee,
  };
}
