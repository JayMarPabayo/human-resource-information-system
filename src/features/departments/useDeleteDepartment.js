import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteDepartment as deleteDepartmentApi } from "../../services/apiDepartments";
export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteDepartment } = useMutation({
    mutationFn: (id) => deleteDepartmentApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
    onError: (err) => alert(err.message),
  });

  return {
    isDeleting,
    deleteDepartment,
  };
}
