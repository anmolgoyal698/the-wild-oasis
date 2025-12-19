import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings"
import { toast } from "react-hot-toast";

export const useUpdateSetting = () => {
    const queryClient = useQueryClient();
    const {isPending: isUpdating, mutate: updateSettings} = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Setting updated successfully");
            queryClient.invalidateQueries({queryKey: ["settings"]});
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    
    return {
        isUpdating,
        updateSettings
    };
};