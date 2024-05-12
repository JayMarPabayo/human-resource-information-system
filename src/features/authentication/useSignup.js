import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
  });

  return { signup, isSigningUp };
}
