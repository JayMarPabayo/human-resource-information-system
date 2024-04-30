import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateDepartment } from "../../services/apiDepartments";

export function useCreateDepartment() {
  const queryClient = useQueryClient();

  const {
    mutate: createDepartment,
    isLoading: departmentCreating,
    isError: isdepartmentCreatingError,
    error,
    reset,
  } = useMutation({
    mutationFn: createUpdateDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
    onError: (err) => console.error(err.message),
  });

  return {
    departmentCreating,
    createDepartment,
    isdepartmentCreatingError,
    error,
    reset,
  };
}
