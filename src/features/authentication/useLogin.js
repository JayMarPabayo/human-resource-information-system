import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isPending: isLogging,
    isError: errorLogin,
    error,
  } = useMutation({
    mutationFn: ({ username, password }) => loginApi({ username, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });

  return { login, isLogging, errorLogin, error };
}
