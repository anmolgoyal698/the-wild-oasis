import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";


export const useDeleteBooking = () => {
    const { bookingId } = useParams();
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: () => deleteBookingApi(bookingId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['booking', bookingId] });
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            toast.success(`Booking #${bookingId} deleted successfully!`);
        },
        onError: () => {
            toast.error('Error deleting booking. Please try again.');
        },
    });
    return { isDeleting, deleteBooking };
}