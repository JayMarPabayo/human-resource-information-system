import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteEmployee as deleteEmployeeApi } from "../../services/apiEmployees";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteEmployee } = useMutation({
    mutationFn: (id) => deleteEmployeeApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee"],
      });
    },
    onError: (err) => alert(err.message),
  });

  return {
    isDeleting,
    deleteEmployee,
  };
}
