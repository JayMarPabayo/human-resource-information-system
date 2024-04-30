import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateDepartment } from "../../services/apiDepartments";

export function useUpdateDepartment() {
  const queryClient = useQueryClient();

  const {
    mutate: updateDepartment,
    isLoading: departmentUpdating,
    isError: isdepartmentUpdatingError,
    error,
    reset,
  } = useMutation({
    mutationFn: ({ department, id }) => createUpdateDepartment(department, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
    onError: (err) => console.error(err?.message),
  });

  return {
    departmentUpdating,
    updateDepartment,
    isdepartmentUpdatingError,
    error,
    reset,
  };
}
