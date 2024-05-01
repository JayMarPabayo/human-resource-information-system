import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateEmployee } from "../../services/apiEmployees";

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  const { mutate: updateEmployee, isPending: employeeUpdating } = useMutation({
    mutationFn: ({ employee, id }) => createUpdateEmployee(employee, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
    onError: (err) => console.error(err.message),
  });

  return {
    updateEmployee,
    employeeUpdating,
  };
}
