import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteEmployee as deleteEmployeeApi } from "../../services/apiEmployees";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteEmployee } = useMutation({
    mutationFn: (id) => deleteEmployeeApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
    onError: (err) => alert(err.message),
  });

  return {
    isDeleting,
    deleteEmployee,
  };
}
