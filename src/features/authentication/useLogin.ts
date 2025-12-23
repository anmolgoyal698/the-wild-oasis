import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
    // Implementation of the useLogin hook

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {isPending, error, mutate: login} = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),
        onSuccess: (data) => {
            console.log('Logged in user:', data.user);
            queryClient.setQueryData(['user'], data.user);
            navigate("/dashboard", {replace: true});
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message || 'Provided email or password is incorrect');
        },
    });

    return {isPending, error, login};
}