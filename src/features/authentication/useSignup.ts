import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";


export const useSignUp = () => {

    const {isPending, mutate} = useMutation({
        mutationFn: signUpApi,
        onSuccess: (data) => {
            console.log('Signed up user:', data);
            toast.success('Account created successfully!');
        },
        onError: (error) => {
            console.error(error);
        },
    });

    return {isPending, signUp: mutate};

};