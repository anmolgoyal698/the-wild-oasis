import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout as logoutApi } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom";


export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: logout, isPending} = useMutation({
        mutationFn: () => logoutApi(),
        onSuccess: () => {
            console.log('Logged out successfully');
            // invalidate all queries
            queryClient.removeQueries();
            navigate("/login", {replace: true});
        },
        onError: (error) => {
            console.error('Error logging out:', error);
        },
    });
    return {logout, isPending};
}