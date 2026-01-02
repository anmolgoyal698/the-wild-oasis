import { useParams } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useCheckout = () => {

    const {bookingId} = useParams();
    const queryClient = useQueryClient();

    const {isPending: isCheckingOut, mutate: checkOut} = useMutation({
        mutationFn: () => updateBooking(+bookingId!, {status: 'checked-out'}),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['booking', bookingId]});
            queryClient.invalidateQueries({queryKey: ['bookings']});
            toast.success(`Booking #${data.id} checked out successfully!`);
        },
        onError: () => {
            toast.error('Error checking out guest. Please try again.');
        },
    });
    return {isCheckingOut, checkOut};
}