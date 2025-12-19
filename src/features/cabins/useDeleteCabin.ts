import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {

  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: removeCabin} = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (error) => {
      console.error("Error deleting cabin:", error);
      toast.error(error.message);
    },
  });
  return { isDeleting, removeCabin };
};